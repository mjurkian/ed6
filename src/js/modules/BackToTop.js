/**
 * Scroll to top
 *
 * @returns {{init: init}}
 */
const BackToTop = (() => {
    const DOM = {};

    const cacheDOM = () => {
        DOM.icon = document.getElementById("backToTop");
    }

    const backToTop = () => {
        if ((window.innerHeight + window.scrollY) >= window.innerHeight + 200) {
            DOM.icon.classList.add('active');
        } else {
            DOM.icon.classList.remove('active');
        }
    }

    const eventListener = () => {
        window.addEventListener("scroll", backToTop);
    }

    const init = () => {
        cacheDOM();
        eventListener();
    };

    return {
        init,
    };
})();

export default BackToTop;
