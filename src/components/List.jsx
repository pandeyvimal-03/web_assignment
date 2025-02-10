"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddUserModel from './AddUserModel'
import { UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getusers, adduser, getGenders, getQualifications } from '@/actions/user'
import ShimmerList from './ShimmerList'
import Loader from './Loader'
import { useContext } from 'react'
import { ToastifyContext } from '@/context/Toastify'
import moment from 'moment'

function List() {
    const [users, setUsers] = useState([])
    const [genders, setGenders] = useState([])
    const [qualifications, setQualifications] = useState([])
    const [loading, setLoading] = useState(false)
    const [loader, showLoader] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)

    const {successMsg , errorMsg} = useContext(ToastifyContext)

    const loadList = () => {
        setLoading(true)
        getusers()
            .then((res) => {
                if (res.status) {
                    setUsers(res.result)
                }
                else {
                    alert("Failed to load list")
                }
            })
            .catch((error) => {
                alert('Error occured in loading !!')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const loadGenders = () => {
        getGenders()
            .then((res) => {
                if (res.status) {
                    setGenders(res.result)
                }
                else {
                    alert("Failed to load genders")
                }
            })
            .catch((error) => {
                alert('Error occured in loading !!')
            })

    }

    const loadQualifications = () => {
        getQualifications()
            .then((res) => {
                if (res.status) {
                    setQualifications(res.result)
                }
                else {
                    alert("Failed to load genders")
                }
            })
            .catch((error) => {
                alert('Error occured in loading !!')
            })
    }

    const onSubmit = async(model) => {
        showLoader(true)
       return adduser(model)
            .then((res) => {
                if (res.status) {
                    setUsers(res.result)
                    successMsg("User added successfully !!")
                    return true
                }
                else {
                    errorMsg("Submission failed !!")
                    return false;
                }
            })
            .catch((error) => {
                errorMsg("submission failed !!")
                return false;
            })
            .finally(() => {
                showLoader(false)
            })
    }

    const toggleModel = (bool)=>{
        console.log("toggle has been called with value : " , bool)
        setOpenDialog(bool)
    }

    useEffect(() => {
        loadGenders();
        loadQualifications();
        loadList();
    }, [])
    return (
        <React.Fragment>
            {loader && <Loader />}
            <div className='w-[80%] mx-auto mt-8'>
                <div className='w-full text-right'>
                    <Button onClick={()=>toggleModel(true)}><UserPlus />Add User</Button>
                    <Dialog className='' open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger></DialogTrigger>
                        <AddUserModel qualifications={qualifications} genders={genders} onSubmit={onSubmit} toggleModel={toggleModel}/>
                    </Dialog>
                </div>
                <Card className='mt-2'>
                    <CardHeader>
                        <CardTitle className='text-xl'>Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table >
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>DOB</TableHead>
                                    <TableHead className="text-right">Gender</TableHead>
                                    <TableHead className="text-right">Qualification</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    loading ? <ShimmerList /> :
                                        users.length > 0 && users.map((ele) => {
                                            return (
                                                <TableRow>
                                                    <TableCell className="font-medium">{ele?.username}</TableCell>
                                                    <TableCell>{ele?.email}</TableCell>
                                                    <TableCell>{moment(ele?.dob).utc().format("D MMM YYYY")}</TableCell>
                                                    <TableCell className="text-right">{ele?.gendername}</TableCell>
                                                    <TableCell className="text-right">{ele?.qualificationname}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </React.Fragment>

    )
}

export default List
