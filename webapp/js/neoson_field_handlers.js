function handle_io_code(prop, value, objectDisplayedCallbacks) {
    // value = array[3] of string
    objectDisplayedCallbacks.push(function() {
	    // Register editor for the io_code
	    $("#io_code").editInPlace({
            	    callback: function(unused, enteredText) {
                        console.log("io_code value updated!");
                        if (CURRENT_JSON_OBJECT.modifiedProps["io_code"] == undefined) {
                            CURRENT_JSON_OBJECT.modifiedProps["io_code"] = CURRENT_JSON_OBJECT["io_code"];
                        }
                        CURRENT_JSON_OBJECT.modifiedProps["io_code"][1] = enteredText;

                        return enteredText;
                    },
		    bg_over: "#ccc",
		    bg_out: "#ddd",
		    field_type: "textarea",
		    textarea_rows: "20",
		    textarea_cols: "150",
	    });
    });

    return "<div id='io_code' class='editable'" + 
           "style='margin: 5px 0px 0px 20px;'>" + value[1] + "</div>";
}

function handle_simple_string(prop, value, objectDisplayedCallbacks) {
    objectDisplayedCallbacks.push(function() {
	    $("#" + prop).editInPlace({
            	    callback: function(unused, enteredText) {
                        console.log(prop + " value updated!");
                        if (enteredText == "") enteredText = null;
                        CURRENT_JSON_OBJECT.modifiedProps[prop] = enteredText;

                        return enteredText;
                    },
		    bg_over: "#ccc",
		    bg_out: "#ddd"
	    });
    });

    return "<span id='" + prop + "' class='editable'>" + value + "</span>";
}

function handle_boolean(prop, value, objectDisplayedCallbacks) {
    objectDisplayedCallbacks.push(function() {
	    $("#" + prop).editInPlace({
            	    callback: function(unused, enteredText) {
                        console.log(prop + " value updated!");
                        CURRENT_JSON_OBJECT.modifiedProps[prop] = (enteredText == 'true');

                        return enteredText;
                    },
		    field_type : "select",
		    select_options: "true, false",
		    bg_over: "#ccc",
		    bg_out: "#ddd"
	    });
    });

    return "<span id='" + prop + "' class='editable'>" + value + "</span>";
}

function FieldHandler () {
}

FieldHandler.prototype = {
    handlers : {
	'io_code' : handle_io_code,
        'io_name' : handle_simple_string,
        'io_identifier' : handle_simple_string,
        'io_class_name' : handle_simple_string,
        'io_active' : handle_boolean,
        'io_description' : handle_simple_string,
        'io_route' : handle_simple_string,
        'io_test_script' : handle_simple_string,
        'io_created_on' : handle_simple_string,
        'io_updated_on' : handle_simple_string,
        'io_next_operation' : handle_simple_string,
        'io_previous_operation' : handle_simple_string,
        'io_method_name' : handle_simple_string,
        'io_operation' : handle_simple_string,
    },

    objectDisplayedCallbacks : [],

    shouldHandle : function(prop) {
        return this.handlers[prop] != undefined;
    },

    handle : function(prop, value, objectDisplayedCallbacks) {
        return this.handlers[prop](prop, value, objectDisplayedCallbacks);
    } }
