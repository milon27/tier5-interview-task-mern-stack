import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AxiosHelper from '../../utils/AxiosHelper'
import { CountryList, DeviceList } from '../../utils/Data'
import { IUser } from '../../utils/models/User'
import MySelectGender from '../layout/common/MySelectGender'
import Button from '../layout/form/Button'
import EmailInput from '../layout/form/EmailInput'
import MySelect from '../layout/form/MySelect'
import TextInput from '../layout/form/TextInput'
import Spacer from '../layout/Spacer'
import MyPageWrapper from './MyPageWrapper'

interface IUserData {
    name: string
    email: string
    countryCode: string
    gender: string
    device: string
}

export default function AddUser() {
    const { register, formState: { errors }, setValue, watch, handleSubmit, reset } = useForm<IUserData>({
        defaultValues: {
            name: "",
            email: "",
            gender: "MALE",
            device: DeviceList[0].value,
            countryCode: CountryList[0].value
        }
    })
    const genderWatch = watch("gender", "MALE")
    const deviceWatch = watch("device", DeviceList[0].value)
    const countryCodeWatch = watch("countryCode", CountryList[0].value)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (input: IUserData) => {
        setLoading(true)
        await AxiosHelper.postData<IUser, IUserData>(setLoading, 'users/add', input, (user) => {
            toast("User Created successfully.")
            reset({
                name: "",
                email: "",
                gender: "MALE",
                device: DeviceList[0].value,
                countryCode: CountryList[0].value
            })
        })
    }

    return (
        <MyPageWrapper>
            <div className='mx-auto w-80 min-h-screen grid place-content-center'>
                <h1 className='text-xl font-semibold text-center text-black'>Add New User</h1>
                <Spacer />
                <TextInput label="Your Name" name='name' register={register} errors={errors} />
                <Spacer />
                <EmailInput label="Your Email" register={register} errors={errors} />
                <Spacer />
                <MySelectGender title='Select Gender' gender={genderWatch} onSelect={(value) => {
                    setValue("gender", value)
                }} />
                <Spacer />
                <MySelect
                    label='Select Device?'
                    value={deviceWatch}
                    options={DeviceList}
                    onSelect={(item) => {
                        setValue("device", item.value)
                    }}
                />
                <Spacer />
                <MySelect
                    label='Select Country?'
                    value={countryCodeWatch}
                    options={CountryList}
                    onSelect={(item) => {
                        setValue("countryCode", item.value)
                    }}
                />
                <Spacer />
                <Button loading={loading} fullWidth onClick={() => {
                    handleSubmit(onSubmit)()
                }}>Create Now</Button>
                <Spacer />
            </div>
        </MyPageWrapper>
    )
}
