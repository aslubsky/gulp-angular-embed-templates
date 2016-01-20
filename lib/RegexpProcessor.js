var extend = require('./utils').extend;
var Processor = require('./Processor');

var RegexpProcessor = extend(Processor, {
    init : function(config) {
        this._super.init(config);
    },

    /**
     * @return {String} return regexp pattern
     */
    getPattern : function() {
        throw 'not implemented';
    },

    process : function(fileContext, cb, onErr) {
        /**
         * @type {RegExp} we create a regexp each time with 'g' flag to hold current position
         * and search second time from previous position + 1
         */
        var pattern = this.getPattern();
        var regexp = new RegExp(pattern, 'g');
        var entrances = [];

        var that = this;
        function next() {
            var match = regexp.exec(fileContext.content);
            if (match === null) {
                cb(entrances);
                return;
            }
            that.replaceMatch(fileContext, match, function(entrance) {
                if (entrance) {
                    entrances.push(entrance);
                }
                next();
            }, onErr);
        }
        next();
    },

    replaceMatch : function(fileContext, match, cb, onErr) {
        throw 'not implemented';
    }
});

module.exports = RegexpProcessor;