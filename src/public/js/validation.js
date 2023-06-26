
// Constructỏ function
function Validator(options) {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    // Lấy element của form cần validate
    const formElement = $(options.form)
    // Lấy thẻ cha của thẻ selector
    const getParent = (element, selector) =>{
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    if(formElement){
        // ! Xử lí lặp qua mỗi rule (lắng nghe các sự kiện như click , blur..)
        options.rules.forEach((rule) => {
            const inputElement = formElement.querySelector(rule.selector)
            

            if(inputElement){
                // * khi blur khỏi input
                inputElement.onblur = () =>{                   
                    validate(inputElement, rule)
                }

                // * khi nhập dữ liệu
                inputElement.oninput = () =>{
                    const formMessage =  getParent(inputElement, options.formGroup).querySelector('.form-message')
                    formMessage.innerText = ''      
                    getParent(inputElement, options.formGroup).classList.remove('invalid')
                }
            }
        })

        // ! khi submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();
            

            let isFormValid = true
            // lặp lại rules để thực hiện validate
            // mục đích: ktra tất cả input đã nhập chưa
            options.rules.forEach((rule) => {
                const inputElement = formElement.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)

                if (isValid) {
                    isFormValid = false
                    
                } 
            })                       
            
            if (isFormValid){
                if (typeof options.onSubmit === 'function'){
                    const enableInputs = formElement.querySelectorAll('[name]')
                    const formValues = Array.from(enableInputs).reduce(
                        (values, input) => {
                            switch (input.type){
                                case 'checkbox':
                                    values[input.name] = Array.from(formElement.querySelectorAll('input[name="' + input.name + '"]:checked')).reduce(
                                        (acc, checkbox) => {
                                            acc.push(checkbox.value)
                                            return acc
                                        },[]
                                    )
                                    break;
                                case 'radio':
                                    values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                                    break;
                                case 'file':
                                    values[input.name] = input.files
                                    break;
                                default:
                                    values[input.name] = input.value;
                                    break;
                            }
                            return values
                    }, {})
                    
                    options.onSubmit(formValues)
                }
            }
            
        }
    }

    // Hàm thực hiện validate 
    function validate(inputElement, rule) {
        // value: inputElement.value
        // test func: rule.test
        const errorMessage = rule.test(inputElement.value)
        
        const formMessage =  getParent(inputElement, options.formGroup).querySelector('.form-message')
        // rule.test(inputElement.value) => 'vui lòng nhập trường này'
        if(errorMessage){
            formMessage.innerHTML = errorMessage
            getParent(inputElement, options.formGroup).classList.add('invalid')
        } else {
            formMessage.innerHTML = ''      
            getParent(inputElement, options.formGroup).classList.remove('invalid')
            getParent(inputElement, options.formGroup).classList.add('success')

        }

        return errorMessage
        // errorMessage là lỗi nên false
    }
    
    
}

// Địng nghĩa rules
// Nguyên tắc:
// 1: khi có lỗi => trả ra messae lỗi
// 2: khi hợp lệ => không trả
Validator.isRequired = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isPrice = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isAvailable = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isImage = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isDescription = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isRole = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}
Validator.isEmail = (selector, message1, message2) => {
    return {
        selector,
        test: (value) => {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(regex.test(value)){
                return undefined
            } else if(!value.trim()){
                return message1
            } else {
                return message2 || 'Vui lòng nhập đúng email'
            }
        }
    }
}
Validator.isPassword = (selector, min) => {
    return {
        selector,
        test: (value) => {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    }
}
Validator.isConfirmed = (selector, message1, message2) => {
    return {
        selector,
        test: (value) =>{
            const $ = document.querySelector.bind(document);
            if(value == $('#form-1 #password').value && value.trim()){
                
                console.log($('#form-1 #password').value)
            } else if(!value.trim()) {
                return message1
            } else {
                return message2 || 'Vui lòng nhập chính xác mật khẩu'
            }
        }
    }
}


