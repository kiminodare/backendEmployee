import {prisma} from "../utility/prismaUtility";
import {IEmployeeModel} from "../model/employee.model";
import {generateFakeEmployee} from "./faker";

export const generateEmployeeId = async (req: any, res: any) => {
    const EmployeeData: IEmployeeModel[] = []

    for (let i = 0; i < 100; i++) {
        EmployeeData.push(
            generateFakeEmployee()
        )
    }
    try {
        await prisma.employee.createMany({
            data: EmployeeData
        })
        await prisma.$disconnect()
        return res.status(200).json({
            error: false,
            message: 'Employee generated successfully',
        });
    } catch (e) {
        console.error(e)
        return res.status(400).json({
            error: true,
            message: 'Error ' + e
        });
    }
}

export const removeEmployee = async (req: any, res: any) => {
    try {
        await prisma.employee.deleteMany()
        await prisma.$disconnect()
        return res.status(200).json({
            error: false,
            message: 'Employee deleted successfully',
        });
    } catch (e) {
        console.error(e)
        return res.status(400).json({
            error: true,
            message: 'Error ' + e
        });
    }
}

export const getEmployee = async (req: any, res: any) => {
    try {
        const {page, size, category, search, sort} = req.query
        let orderBy: any = {
            id: 'asc'
        }
        if (sort){
            const [key, value] = sort.split(':')
            if (value === 'asc' || value === 'desc') {
                orderBy = {
                    [key]: value
                }
            }
        }

        if (search) {

            const employee = await prisma.employee.findMany({
                take: Number(size) || 10,
                skip: Number(page) * Number(size) || 0,
                where: {
                    OR: [
                        {
                            userName: {
                                contains: search,
                            },
                        },
                        {
                            firstName: {
                                contains: search,
                            },
                        },
                        {
                            lastName: {
                                contains: search,
                            }
                        },
                        {
                            email: {
                                contains: search,
                            }
                        },
                        {
                            group: {
                                contains: search,
                            }
                        }
                    ],
                    group: {
                        contains: category
                    },
                },
                orderBy: orderBy
            })
            console.log(employee)
            const total = await prisma.employee.count({
                where: {
                    OR: [
                        {
                            userName: {
                                contains: search,
                            },
                        },
                        {
                            firstName: {
                                contains: search,
                            },
                        },
                        {
                            lastName: {
                                contains: search,
                            }
                        },
                        {
                            email: {
                                contains: search,
                            }
                        },
                        {
                            group: {
                                contains: search,
                            }
                        }
                    ],
                    group: {
                        contains: category
                    }
                }
            })
            await prisma.$disconnect()
            return res.status(200).json({
                errorMessage: null,
                code: 200,
                payload: employee,
                success: true,
                successMessage: 'Employee fetched successfully',
                pageable: {
                    total_number: employee.length,
                    pageNumber: employee.length > 0 ? Number(page) : 0,
                    pageSize: employee.length > 0 ? Number(size) : 0,
                    totalPages: Math.ceil(total / Number(size)),
                    totalElements: total,
                },
            });
        } else {
            const employee = await prisma.employee.findMany({
                take: Number(size) || 10,
                skip: Number(page) * Number(size) || 0,
                where: {
                    group: {
                        contains: category
                    }
                },
                orderBy: orderBy
            })
            const total = await prisma.employee.count()
            await prisma.$disconnect()
            return res.status(200).json({
                errorMessage: null,
                code: 200,
                payload: employee,
                success: true,
                successMessage: 'Employee fetched successfully',
                pageable: {
                    total_number: employee.length,
                    pageNumber: employee.length > 0 ? Number(page) : 0,
                    pageSize: employee.length > 0 ? Number(size) : 0,
                    totalPages: Math.ceil(total / Number(size)),
                    totalElements: total,
                },
            });
        }

    } catch (e) {
        return res.status(400).json({
            errorMessage: e,
            code: 400,
            payload: null,
            success: false,
            successMessage: 'Error ' + e,
            pageable: {
                total_number: 0,
                page_number: 0,
                page_size: 0,
                total_pages: 0,
            }
        })
    }
}

export const getEmployeeById = async (req: any, res: any) => {
    try {
        const {id} = req.params
        const employee = await prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        })
        await prisma.$disconnect()
        return res.status(200).json({
            errorMessage: null,
            code: 200,
            payload: [employee],
            success: true,
            successMessage: 'Employee fetched successfully',
        });
    } catch (e) {
        return res.status(400).json({
            errorMessage: e,
            code: 400,
            payload: null,
            success: false,
            successMessage: 'Error ' + e,
        })
    }
}