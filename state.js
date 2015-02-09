/**
 * Activate a state.
 *
 * @public
 * @param {object} The event object.
 * @param {object} The data object.
*/
exports.state = function (event, data) {

    // check if state exists
    if (this.states[data.name]) {

        // activate state elements
        for (var i = 0, state; i < this.states[data.name].length; ++i) {
            state = this.states[data.name][i];

            // retrun if no selector is found
            if (!state.sel) {
                return;
            }

            // get the tempalte
            var template = this.tmpls[state.tmpl];

            // get the template scope for "to" state
            if (state.tmpl && template) {
                state.tmpl = template.to;
            }

            // auto hide pages before activate a state
            if (template && template.page) {

                // add "hide" class to all pages
                manipulateClasses(
                  (state.tmpl || document).querySelectorAll('.' + template.page),
                  {add: ['hide']}
                );
            }

            // manipulate classes
            manipulateClasses((state.tmpl || document).querySelectorAll(state.sel), state);
        }
    }
};

/**
 * Manipulate css classes (add, rm, toggle).
 *
 * @private
 * @param {object} The event object.
 * @param {object} The data object.
*/
function manipulateClasses (elms, state) {

    // manipulate classes
    for (var i = 0; i < elms.length; ++i) {

        // remove classes
        state.rm && elms[i].classList.remove.apply(elms[i].classList, state.rm);

        // add classes
        state.add && elms[i].classList.add.apply(elms[i].classList, state.add);

        // toggle classes
        state.toggle && elms[i].classList.toggle.apply(elms[i].classList, state.toggle);
    }
}
