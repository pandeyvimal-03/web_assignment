
import React, { useEffect, useState } from 'react'
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { isValidate } from '@/utils'


function AddUserModel({ genders, qualifications , onSubmit , toggleModel }) {
    const [formData, setFormData] = useState({
        username: { name: 'username', value: '', error: '', isRequired: true },
        email: { name: 'email', value: '', error: '', isRequired: true },
        dob: { name: 'dob', value: '', error: '', isRequired: true },
        qualification: { name: 'qualification', value: '', error: '', isRequired: true },
        gender: { name: 'gender', value: '', error: '', isRequired: true },
        about: { name: 'about', value: '', error: '', isRequired: false }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log("name and value is : ", name , "  : " , value)
        setFormData((prev)=>({
            ...prev,
            [name] : {...prev[name] , value : value , error : ''}
        }))
    }

    const handleSelect = (value) => {
        console.log("type is : " , typeof value)
        setFormData((prev) => ({
            ...prev,
            qualification: { ...prev.qualification, value , error : ''}
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("formdata in submit is : ", formData)
        if (isValidate(formData, setFormData)) {
            const model = {
                username: formData.username.value,
                dob: formData.dob.value,
                genderid: formData.gender.value,
                qualificationid: formData.qualification.value,
                email: formData.email.value,
                about: formData.about.value,
            }
            onSubmit(model)
               .then((res)=>{
                   if(res){
                    setFormData({
                        username: { name: 'username', value: '', error: '', isRequired: true },
                        email: { name: 'email', value: '', error: '', isRequired: true },
                        dob: { name: 'dob', value: '', error: '', isRequired: true },
                        qualification: { name: 'qualification', value: '', error: '', isRequired: true },
                        gender: { name: 'gender', value: '', error: '', isRequired: true },
                        about: { name: 'about', value: '', error: '', isRequired: false }
                    });
                    toggleModel(false);
                   }
               })
        }
    }


    return (
        <DialogContent className="mt-12 max-w-xl rounded-lg p-6">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-800">Add New User</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid layout for 2 columns */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Username */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" className="text-sm font-medium text-gray-700">Username<span className="text-red-500">*</span></Label>
                        <Input type="text" id="username" name="username" value={formData.username.value} onChange={handleChange} className="h-10" />
                        {formData.username.error && <p className="text-sm text-red-500 ">{formData.username.error}</p>}
                    </div>


                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></Label>
                        <Input type="email" id="email" name="email" value={formData.email.value} onChange={handleChange} className="h-10" />
                        {formData.email.error && <p className="text-sm text-red-500 ">{formData.email.error}</p>}
                    </div>

                    {/* DOB */}
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of Birth<span className="text-red-500">*</span></Label>
                        <Input type="date" id="dob" name="dob" value={formData.dob.value} onChange={handleChange}  className="h-10" />
                        {formData.dob.error && <p className="text-sm text-red-500 ">{formData.dob.error}</p>}
                    </div>

                    {/* Qualification */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Qualification<span className="text-red-500">*</span></Label>
                        <Select onValueChange={(value) => handleSelect(value)}>
                            <SelectTrigger className="h-10">
                                <SelectValue placeholder="Select Qualification" >
                                    {
                                        qualifications?.find((item)=> item.qualificationid == formData?.qualification?.value)?.qualificationname || "Select Qualification"
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    qualifications?.map((item) => {
                                        return <SelectItem value={item.qualificationid}>{item.qualificationname}</SelectItem>

                                    })
                                }
                            </SelectContent>
                        </Select>
                        {formData.qualification.error && <p className="text-sm text-red-500 ">{formData.qualification.error}</p>}
                    </div>
                </div>

                {/* Gender (Radio Buttons) */}
                <div className="flex flex-col space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Gender<span className="text-red-500">*</span></Label>
                    <RadioGroup defaultValue="" onValueChange={(value) => setFormData({ ...formData, gender: { ...formData.gender, value: value , error : ''} })} className="flex space-x-6">

                        {
                            genders?.map((item) => {
                                return (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={item.genderid} id={item.gendername} />
                                        <Label htmlFor={item.gendername}>{item.gendername}</Label>
                                    </div>
                                )
                            })
                        }

                    </RadioGroup>
                    {formData.gender.error && <p className="text-sm text-red-500 ">{formData.gender.error}</p>}
                </div>

                {/* About (Full Width) */}
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="about" className="text-sm font-medium text-gray-700">About</Label>
                    <Textarea id="about" name="about" value={formData.about.value} onChange={handleChange} rows={3}  className="h-24" />
                </div>

                {/* Submit Button */}
                <div className="text-right">
                    <Button type="submit" className="px-6 py-2">Submit</Button>
                </div>
            </form>
        </DialogContent>
    )
}

export default AddUserModel
