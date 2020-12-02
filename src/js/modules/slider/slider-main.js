import Slider from './slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    }

    showSlides(n) {
        if(n > this.slides.length) {    //после последнего слайда переходим на первый слайд
            this.slideIndex = 1;
        }

        if(n < 1) {             //после первого слайда возвращаемся на последний
            this.slideIndex = this.slideIndex.length;  
        }

        try{  //прорабатываем всплывающий блок на 3й странице
            this.blockHanson.style.opacity = '0';//изначально скрываем блок
            if(n === 3) { // когда попадаем на 3-ю страницу, отображаем блок, дополнительно добавив анимацию
                this.blockHanson.classList.add('animated');
                setTimeout(()=> {
                    this.blockHanson.style.opacity = '1';
                    this.blockHanson.classList.add('slideInUp');
                }, 3000);
            } else {//в случае ухода со страницы убираем класс
                this.blockHanson.classList.remove('slideInUp');
            }
        }catch(e){}
        

        this.slides.forEach(slide => {   //скрываем все слайды со страницы чтобы потом вывести один с нужным нам индексом
            slide.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';  //выводим нужный нам слайд по индексу
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n); //функция для смены слайда
    }

    bindTriggers() {
        this.btns.forEach(item => {    //назначаем обработчик события для кнопки переключения слайдов
            item.addEventListener('click', () => {
                this.plusSlides(1);
            });

            //назначаем обработчик событий для кнопки возврата на начальный слайд. Чтобы не передавать дополнительные
            //селекторы, "добираемся" до нужной кнопки при помощи parentNode.previousElementSibling, обращаясь к
            // "родителю" parentNode, а затем к соседнему элементу, находящемуся "выше" previousElementSibling
                
            item.parentNode.previousElementSibling.addEventListener('click', (e) => {  
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            });
        });

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(-1);
            });
        });

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlides(1);
            });
        });
        
    }

    render () {
        if (this.container) {
            try{ 
                this.blockHanson = document.querySelector('.hanson');
            } catch(e){}

          
            this.showSlides(this.slideIndex);
            this.bindTriggers();
        } 
    }
}