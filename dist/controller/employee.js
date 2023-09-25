"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeById = exports.getEmployee = exports.removeEmployee = exports.generateEmployeeId = void 0;
const prismaUtility_1 = require("../utility/prismaUtility");
const faker_1 = require("./faker");
const generateEmployeeId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const EmployeeData = [];
    for (let i = 0; i < 100; i++) {
        EmployeeData.push((0, faker_1.generateFakeEmployee)());
    }
    try {
        yield prismaUtility_1.prisma.employee.createMany({
            data: EmployeeData
        });
        yield prismaUtility_1.prisma.$disconnect();
        return res.status(200).json({
            error: false,
            message: 'Employee generated successfully',
        });
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({
            error: true,
            message: 'Error ' + e
        });
    }
});
exports.generateEmployeeId = generateEmployeeId;
const removeEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaUtility_1.prisma.employee.deleteMany();
        yield prismaUtility_1.prisma.$disconnect();
        return res.status(200).json({
            error: false,
            message: 'Employee deleted successfully',
        });
    }
    catch (e) {
        console.error(e);
        return res.status(400).json({
            error: true,
            message: 'Error ' + e
        });
    }
});
exports.removeEmployee = removeEmployee;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, size, category, search, sort } = req.query;
        let orderBy = {
            id: 'asc'
        };
        if (sort) {
            const [key, value] = sort.split(':');
            if (value === 'asc' || value === 'desc') {
                orderBy = {
                    [key]: value
                };
            }
        }
        if (search) {
            const employee = yield prismaUtility_1.prisma.employee.findMany({
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
            });
            console.log(employee);
            const total = yield prismaUtility_1.prisma.employee.count({
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
            });
            yield prismaUtility_1.prisma.$disconnect();
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
        else {
            const employee = yield prismaUtility_1.prisma.employee.findMany({
                take: Number(size) || 10,
                skip: Number(page) * Number(size) || 0,
                where: {
                    group: {
                        contains: category
                    }
                },
                orderBy: orderBy
            });
            const total = yield prismaUtility_1.prisma.employee.count();
            yield prismaUtility_1.prisma.$disconnect();
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
    }
    catch (e) {
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
        });
    }
});
exports.getEmployee = getEmployee;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield prismaUtility_1.prisma.employee.findUnique({
            where: {
                id: Number(id)
            }
        });
        yield prismaUtility_1.prisma.$disconnect();
        return res.status(200).json({
            errorMessage: null,
            code: 200,
            payload: [employee],
            success: true,
            successMessage: 'Employee fetched successfully',
        });
    }
    catch (e) {
        return res.status(400).json({
            errorMessage: e,
            code: 400,
            payload: null,
            success: false,
            successMessage: 'Error ' + e,
        });
    }
});
exports.getEmployeeById = getEmployeeById;
