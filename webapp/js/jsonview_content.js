function JSONFormatter(object, wantedFields, jsonObject, fieldHandler) {
    OBJECT = object;
    JSON_OBJECT = jsonObject;
    WANTED_FIELDS = wantedFields;
    FIELD_HANDLER = fieldHandler;
}

JSONFormatter.prototype = {
        getJSONObject : function() {
	    return JSON_OBJECT;
        },

	htmlEncode : function(t) {
		return t != null ? t.toString().replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : '';
	},

	decorateWithSpan : function(value, className) {
		return '<span class="' + className + '">' + this.htmlEncode(value) + '</span>';
	},

	valueToHTML : function(value, prop) {
		var valueType = typeof value, output = "";
                if (FIELD_HANDLER && FIELD_HANDLER.shouldHandle(prop)) {
                        output += FIELD_HANDLER.handle(prop, value, FIELD_HANDLER.objectDisplayedCallbacks);
                } 
                else 
		if (value == null) {
			output += this.decorateWithSpan('null', 'null');
		} else if (value && value.constructor == Array) {
			output += this.arrayToHTML(value, WANTED_FIELDS);
		} else if (valueType == 'object') {
			output += this.objectToHTML(value, WANTED_FIELDS);
		} else if (valueType == 'number') {
			output += this.decorateWithSpan(value, 'num');
		} else if (valueType == 'string') {
                        if (prop == "io_uuid") {
                                output += this.decorateWithSpan('"', 'string') + 
                                                '<a href="#" onClick="show_record(\'' + OBJECT + '\',\'' + value + '\');">' + this.htmlEncode(value) + '</a>'
						+ this.decorateWithSpan('"', 'string');
                        } else if (/^(http|https):\/\/[^\s]+$/.test(value)) {
				output += this.decorateWithSpan('"', 'string') + '<a href="' + value + '">' + this.htmlEncode(value) + '</a>'
						+ this.decorateWithSpan('"', 'string');
			} else {
				output += this.decorateWithSpan('"' + value + '"', 'string');
			}
		} else if (valueType == 'boolean') {
			output += this.decorateWithSpan(value, 'bool');
		}

		return output;
	},

	arrayToHTML : function(json) {
		var prop, output = '[<ul class="array collapsible">', hasContents = false;
		for (prop in json) {
			hasContents = true;
			output += '<li>';
			output += this.valueToHTML(json[prop]);
			output += '</li>';
		}
		output += '</ul>]';

		if (!hasContents) {
			output = "[ ]";
		}

		return output;
	},

	objectToHTML : function(json) {
		var prop, output = '{<ul class="obj collapsible">', hasContents = false;
		for (prop in json) {
                        wanted = !WANTED_FIELDS || (WANTED_FIELDS && $.inArray(prop, WANTED_FIELDS) >= 0);
                        if (!wanted) continue;
			hasContents = true;
			output += '<li>';
			output += '<span class="prop">' + this.htmlEncode(prop) + '</span>: ';
			output += this.valueToHTML(json[prop], prop);
			output += '</li>';
		}
		output += '</ul>}';

		if (!hasContents) {
			output = "{ }";
		}

		return output;
	},

	jsonToHTML : function(json, fnName) {
		var output = '';
		if (fnName)
			output += '<div class="fn">' + fnName + '(</div>';
		output += '<div id="json">';
		output += this.valueToHTML(json);
		output += '</div>';
		if (fnName)
			output += '<div class="fn">)</div>';
		return output;
	}
};

function collapse(evt) {
	var ellipsis, collapser = evt.target, target = collapser.parentNode.getElementsByClassName('collapsible')[0];
	if (!target)
		return;

	if (target.style.display == 'none') {
		ellipsis = target.parentNode.getElementsByClassName('ellipsis')[0];
		target.parentNode.removeChild(ellipsis);
		target.style.display = '';
	} else {
		target.style.display = 'none';
		ellipsis = document.createElement('span');
		ellipsis.className = 'ellipsis';
		ellipsis.innerHTML = ' &hellip; ';
		target.parentNode.insertBefore(ellipsis, target);
	}
	collapser.innerHTML = (collapser.innerHTML == '-') ? '+' : '-';
}

function displayObject(object, jsonText, fnName, wantedFields, fieldHandler) {
	var parsedObject, errorBox, closeBox;
	if (!jsonText)
		return;
	try {
		parsedObject = JSON.parse(jsonText);
	} catch (e) {
	}
	document.body.style.fontFamily = "monospace"; // chrome bug : does not work in external CSS stylesheet
	if (!parsedObject) {
		try {
			jsonlint.parse(jsonText);
		} catch (e) {
			document.body.innerHTML += '<link rel="stylesheet" type="text/css" href="css/content_error.css">';
			errorBox = document.createElement("pre");
			closeBox = document.createElement("div");
			errorBox.className = "error";
			closeBox.className = "close-error";
			closeBox.onclick = function() {
				errorBox.parentElement.removeChild(errorBox);
			};
			errorBox.textContent = e;
			errorBox.appendChild(closeBox);
			setTimeout(function() {
				document.body.appendChild(errorBox);
				errorBox.style.pixelLeft = Math.max(0, Math.floor((window.innerWidth - errorBox.offsetWidth) / 2));
				errorBox.style.pixelTop = Math.max(0, Math.floor((window.innerHeight - errorBox.offsetHeight) / 2));
			}, 100);
		}
		return;
	}
        formatter = new JSONFormatter(object, wantedFields, parsedObject, fieldHandler);
        displayArea = document.getElementById("neoson"); 
	displayArea.innerHTML = '<link rel="stylesheet" type="text/css" href="css/content.css">'
			+ formatter.jsonToHTML(parsedObject, fnName);
	Array.prototype.forEach.call(document.getElementsByClassName('collapsible'), function(childItem) {
		var collapser, item = childItem.parentNode;
		if (item.nodeName == 'LI') {
			collapser = document.createElement('div');
			collapser.className = 'collapser';
			collapser.innerHTML = '-';
			collapser.addEventListener('click', collapse, false);
			item.insertBefore(collapser, item.firstChild);
		}
	});
        
        return formatter;
}

function extractData(text) {
	var tokens;
	if ((text.charAt(0) == "{" || text.charAt(0) == "[") && (text.charAt(text.length - 1) == "}" || text.charAt(text.length - 1) == "]"))
		return {
			text : text
		};
	tokens = text.match(/^([^\s\(]*)\s*\(\s*([\[{].*[\]}])\s*\)(?:\s*;?)*\s*$/);
	if (tokens && tokens[1] && tokens[2])
		return {
			fnName : tokens[1],
			text : tokens[2]
		};
}
