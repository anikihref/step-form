const multiStepForm = document.querySelector('[data-multi-step]')
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')]
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains('active')
})
const progressbarLine = document.querySelector('.progressbar-line')
const progressbarPoints = [...document.querySelectorAll('.progressbar-point')]

if (currentStep < 0) {
  currentStep = 0
  formSteps[currentStep].classList.add('active')
}

if (progressbarPoints.every(point => !point.classList.contains('active'))) {
  progressbarPoints[0].classList.add('active') 
}




multiStepForm.addEventListener('click', e => {
  let incrementor;

  if (e.target.matches('[data-next]')) {
    incrementor = 1
  } else if (e.target.matches('[data-previous]')) {
    incrementor = -1
  }

  if (incrementor == null) return 

  const inputs = [...formSteps[currentStep].querySelectorAll('input')]
  const allValid = inputs.every(input => input.reportValidity())

  if (allValid) {
    currentStep += incrementor
    progress = getPercentage()

    showProgress()
    showCurrentStep() 
  }

})



formSteps.forEach(step => {
  step.addEventListener('animationend', () => {
    formSteps[currentStep].classList.remove('hide')
    
    step.classList.toggle('hide', !step.classList.contains('active'))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    // add class active if index === currentStep, otherwise remove it
    step.classList.toggle('active', index === currentStep)
  })
}

function getPercentage() {
  return (currentStep / (progressbarPoints.length - 1) * 100).toFixed(3)
}

function showProgress() {
  progressbarPoints.forEach((point, index) => {
    index <= currentStep ? point.classList.add('active') : point.classList.remove('active')
  })

  progressbarLine.style.background = 
    `linear-gradient(90deg, rgb(44, 145, 63) ${progress}%, #fff ${progress}%)`
}