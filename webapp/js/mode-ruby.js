define("ace/mode/ruby",["require","exports","module","pilot/oop","ace/mode/text","ace/tokenizer","ace/mode/ruby_highlight_rules","ace/scarlet/matching_ruby_outdent","ace/range","ace/worker/worker_client","ace/scarlet/rubystyle"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/text").Mode,f=a("ace/tokenizer").Tokenizer,g=a("ace/mode/ruby_highlight_rules").RubyHighlightRules,h=a("ace/scarlet/matching_ruby_outdent").MatchingRubyOutdent,i=a("ace/range").Range,j=a("ace/worker/worker_client").WorkerClient,k=a("ace/scarlet/rubystyle").RubystyleBehaviour,l=function(){this.$tokenizer=new f((new g).getRules()),this.$outdent=new h,this.$behaviour=new k};d.inherits(l,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=[],g=/^(\s*)#/;for(var h=c;h<=d;h++)if(!g.test(b.getLine(h))){e=!1;break}if(e){var j=new i(0,0,0,0);for(var h=c;h<=d;h++){var k=b.getLine(h),l=k.match(g);j.start.row=h,j.end.row=h,j.end.column=l[0].length,b.replace(j,l[1])}}else b.indentRows(c,d,"#")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens,g=e.state;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"){var h=b.match(/^(.*[\{]\s*)|(.*[\(\[]\s*([\]\)]))|(((\w+\s+do)|(def|class|module|if|begin)).*(end)*)$/);h&&(d+=c)}return d},this.checkOutdent=function(a,b,c){return this.$outdent.checkOutdent(b,c)},this.autoOutdent=function(a,b,c){this.$outdent.autoOutdent(b,c)}}.call(l.prototype),b.Mode=l}),define("ace/mode/ruby_highlight_rules",["require","exports","module","pilot/oop","pilot/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/lang"),f=a("ace/mode/text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|gsub!|get_via_redirect|h|host!|https?|https!|include|Integer|lambda|link_to|link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|validates_inclusion_of|validates_numericality_of|validates_with|validates_each|authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|translate|localize|extract_locale_from_tld|t|l|caches_page|expire_page|caches_action|expire_action|cache|expire_fragment|expire_cache_for|observe|cache_sweeper|has_many|has_one|belongs_to|has_and_belongs_to_many".split("|")),b=e.arrayToMap("alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield".split("|")),c=e.arrayToMap("true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING".split("|")),d=e.arrayToMap("$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|$!|root_url|flash|session|cookies|params|request|response|logger".split("|"));this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"comment",merge:!0,regex:"^=begin$",next:"comment"},{token:"string.regexp",regex:"[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"string",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"string",regex:"[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"},{token:"text",regex:"::"},{token:"variable.instancce",regex:"@{1,2}(?:[a-zA-Z_]|d)+"},{token:"variable.class",regex:"[A-Z](?:[a-zA-Z_]|d)+"},{token:"string",regex:"[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"},{token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:function(e){return e=="self"?"variable.language":b.hasOwnProperty(e)?"keyword":c.hasOwnProperty(e)?"constant.language":d.hasOwnProperty(e)?"variable.language":a.hasOwnProperty(e)?"support.function":e=="debugger"?"invalid.deprecated":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"^=end$",next:"start"},{token:"comment",merge:!0,regex:".+"}]}};d.inherits(g,f),b.RubyHighlightRules=g}),define("ace/scarlet/matching_ruby_outdent",["require","exports","module","ace/range"],function(a,b,c){var d=a("ace/range").Range,e=function(){};(function(){this.checkOutdent=function(a,b){return/^\s+$/.test(a)?/^(\s*\})|(end)/.test(b):!1},this.autoOutdent=function(a,b){var c=a.getLine(b),e=c.match(/^(\s*\})|(end)/);if(!e)return 0;var f=e[1].length,g=a.findMatchingBracket({row:b,column:f});if(!g||g.row==b)return 0;var h=this.$getIndent(a.getLine(g.row));a.replace(new d(b,0,b,f-1),h)},this.$getIndent=function(a){var b=a.match(/^(\s+)/);return b?b[1]:""}}).call(e.prototype),b.MatchingRubyOutdent=e}),define("ace/worker/worker_client",["require","exports","module","pilot/oop","pilot/event_emitter"],function(a,b,c){var d=a("pilot/oop"),e=a("pilot/event_emitter").EventEmitter,f=function(b,c,d,e){this.callbacks=[];if(a.packaged)var f=this.$guessBasePath(),g=this.$worker=new Worker(f+c);else{var h=this.$normalizePath(a.nameToUrl("ace/worker/worker",null,"_")),g=this.$worker=new Worker(h),i={};for(var j=0;j<b.length;j++){var k=b[j],l=this.$normalizePath(a.nameToUrl(k,null,"_").replace(/.js$/,""));i[k]=l}}this.$worker.postMessage({init:!0,tlns:i,module:d,classname:e}),this.callbackId=1,this.callbacks={};var m=this;this.$worker.onerror=function(a){throw window.console&&console.log&&console.log(a),a},this.$worker.onmessage=function(a){var b=a.data;switch(b.type){case"log":window.console&&console.log&&console.log(b.data);break;case"event":m._dispatchEvent(b.name,{data:b.data});break;case"call":var c=m.callbacks[b.id];c&&(c(b.data),delete m.callbacks[b.id])}}};(function(){d.implement(this,e),this.$normalizePath=function(a){return a.match(/^\w+:/)||(a=location.protocol+"//"+location.host+(a.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+a.replace(/^[\/]+/,"")),a},this.$guessBasePath=function(){if(a.aceBaseUrl)return a.aceBaseUrl;var b=document.getElementsByTagName("script");for(var c=0;c<b.length;c++){var d=b[c],e=d.getAttribute("data-ace-base");if(e)return e.replace(/\/*$/,"/");var f=d.src||d.getAttribute("src");if(!f)continue;var g=f.match(/^(?:(.*\/)ace\.js|(.*\/)ace-uncompressed\.js)(?:\?|$)/);if(g)return g[1]||g[2]}return""},this.terminate=function(){this._dispatchEvent("terminate",{}),this.$worker.terminate()},this.send=function(a,b){this.$worker.postMessage({command:a,args:b})},this.call=function(a,b,c){if(c){var d=this.callbackId++;this.callbacks[d]=c,b.push(d)}this.send(a,b)},this.emit=function(a,b){this.$worker.postMessage({event:a,data:b})}}).call(f.prototype),b.WorkerClient=f}),define("ace/scarlet/rubystyle",["require","exports","module","pilot/oop","ace/mode/behaviour","ace/mode/behaviour/cstyle"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/behaviour").Behaviour,f=a("ace/mode/behaviour/cstyle").CstyleBehaviour,g=function(){function a(a,b,c){if(a.column==0)return null;var d=a.row;for(;;){if(b.match(/^(\w+\s+do)|(def|class|module)\s+/))return{row:d};d-=1;if(d<0)break;b=c.doc.getLine(d)}return null}function b(a,b){return{text:"\n"+a+"\n"+b,selection:[1,a.length,1,a.length]}}function c(a,b,c,d){var e=a.getSelectionRange(),f=b.doc.getTextRange(e);return f!==""?{text:c+" "+f+" "+d,selection:!1}:!1}this.inherit(f,["braces","parens","string_dquotes"]),this.add("do","insertion",function(a,c,d,e,f){var g=d.getCursorPosition(),h=e.doc.getLine(g.row),i=this.getNextLineIndent(a,h.substring(0,h.length),e.getTabString());if(f=="\n"){var g=d.getCursorPosition(),h=e.doc.getLine(g.row),j=h.charAt(g.column);if(j.match(/[\]\)]/)){var k=h.charAt(g.column-1);if(k.match(/[\[\(]/)){var i=this.getNextLineIndent(a,h.substring(0,h.length),e.getTabString()),l=this.$getIndent(e.doc.getLine(g.row));return b(i,l)}return{text:"",selection:[1,1]}}if(h.match(/^(\s*\w+\s+do)|(def|class|module|if|begin).*$/)){var i=this.getNextLineIndent(a,h.substring(0,h.length),e.getTabString()),l=this.$getIndent(e.doc.getLine(g.row));return b(i,l+"end")}}return console.log("insert done"),!1}),this.add("brackets","insertion",function(a,b,c,d,e){if(e=="["){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"["+g+"]",selection:!1}:{text:"[]",selection:[1,1]}}if(e=="]"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="]"){var k=d.$findOpeningBracket("]",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}return!1}),this.add("brackets","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="["){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=="]")return e.end.column++,e}return!1})};d.inherits(g,f),b.RubystyleBehaviour=g}),define("ace/mode/behaviour/cstyle",["require","exports","module","pilot/oop","ace/mode/behaviour"],function(a,b,c){var d=a("pilot/oop"),e=a("ace/mode/behaviour").Behaviour,f=function(){this.add("braces","insertion",function(a,b,c,d,e){if(e=="{"){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"{"+g+"}",selection:!1}:{text:"{}",selection:[1,1]}}if(e=="}"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var k=d.$findOpeningBracket("}",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}else if(e=="\n"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j=="}"){var l=d.findMatchingBracket({row:h.row,column:h.column+1});if(!l)return!1;var m=this.getNextLineIndent(a,i.substring(0,i.length-1),d.getTabString()),n=this.$getIndent(d.doc.getLine(l.row));return{text:"\n"+m+"\n"+n,selection:[1,m.length,1,m.length]}}}return!1}),this.add("braces","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="{"){var g=d.doc.getLine(e.start.row),h=g.substring(e.end.column,e.end.column+1);if(h=="}")return e.end.column++,e}return!1}),this.add("parens","insertion",function(a,b,c,d,e){if(e=="("){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);return g!==""?{text:"("+g+")",selection:!1}:{text:"()",selection:[1,1]}}if(e==")"){var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column,h.column+1);if(j==")"){var k=d.$findOpeningBracket(")",{column:h.column+1,row:h.row});if(k!==null)return{text:"",selection:[1,1]}}}return!1}),this.add("parens","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=="("){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h==")")return e.end.column++,e}return!1}),this.add("string_dquotes","insertion",function(a,b,c,d,e){if(e=='"'){var f=c.getSelectionRange(),g=d.doc.getTextRange(f);if(g!=="")return{text:'"'+g+'"',selection:!1};var h=c.getCursorPosition(),i=d.doc.getLine(h.row),j=i.substring(h.column-1,h.column);if(j=="\\")return!1;var k=d.getTokens(f.start.row,f.start.row)[0].tokens,l=0,m,n=-1;for(var o=0;o<k.length;o++){m=k[o],m.type=="string"?n=-1:n<0&&(n=m.value.indexOf('"'));if(m.value.length+l>f.start.column)break;l+=k[o].value.length}if(!m||n<0&&m.type!=="comment"&&(m.type!=="string"||f.start.column!==m.value.length+l-1&&m.value.lastIndexOf('"')===m.value.length-1))return{text:'""',selection:[1,1]};if(m&&m.type==="string"){var p=i.substring(h.column,h.column+1);if(p=='"')return{text:"",selection:[1,1]}}}return!1}),this.add("string_dquotes","deletion",function(a,b,c,d,e){var f=d.doc.getTextRange(e);if(!e.isMultiLine()&&f=='"'){var g=d.doc.getLine(e.start.row),h=g.substring(e.start.column+1,e.start.column+2);if(h=='"')return e.end.column++,e}return!1})};d.inherits(f,e),b.CstyleBehaviour=f})