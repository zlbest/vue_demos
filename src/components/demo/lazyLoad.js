/**
 * 判断元素是否可见
 */
function isVisible(el){
    let windowHeight = window.innerHeight
    let position = el.getBoundingClientRect()
    // 当元素的top偏移量小于页面高度
    if(position.top < windowHeight){
        return true
    }
    return false
}
/**
 * 对图片进行懒加载
 */
function lazyLoad(img, src){
    if(img && src && isVisible(img)){
        setTimeout(() => {
            img.setAttribute('src', src)
        }, 1000)
    }
}

export default {
    install(Vue, options){
        Vue.directive('lazy', {
            bind: function(el, binding, vnode){
                el.setAttribute('src', require('../../images/default.jpeg'))
                window.addEventListener('scroll', lazyLoad(el, binding.value), true)
            },
            inserted: function(el, binding, vnode){
                lazyLoad(el, binding.value)
            }
        })
    }
}
