export default class ShowInfo {
    constructor (trigger) {
        this.btns = document.querySelectorAll(trigger);
    }

    showMsg() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
               const sibling = btn.closest('.module__info-show').nextElementSibling;

               sibling.classList.toggle('msg');
               sibling.style.marginTop = '20px';

            });
        });
    }

    init() {
        this.showMsg();
    }
}