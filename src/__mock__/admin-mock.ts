import { IAdminInfo } from "@/models/adminModel";

export const AdminMockData: IAdminInfo[] = [
    {
        id: "clp1a2b3c4d5e6f7g8h9i0j1",
        username: "alexander.hayes",
        password:
            "$2b$12$LQv3c1yqBwEHxaAOFaL8uOYNzFSBwIHkQmTKZNkEzYBRNOWOFpjhK", // hashed: "admin123"
        role: "SUPERADMIN",
        createdAt: "2024-01-15T08:00:00.000Z",
        updatedAt: "2024-01-15T08:00:00.000Z",
        adminFacial: {
            id: "clp1f2g3h4i5j6k7l8m9n0o1",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            adminId: "clp1a2b3c4d5e6f7g8h9i0j1",
            isActive: true,
            deviceInfo: "iPhone 14 Pro - iOS 17.1.1 - Safari 17.1",
            createdAt: "2024-01-15T08:05:00.000Z",
            updatedAt: "2024-01-15T08:05:00.000Z",
        },
        sessions: [
            {
                id: "clp1s2t3u4v5w6x7y8z9a0b1",
                adminId: "clp1a2b3c4d5e6f7g8h9i0j1",
                method: "FACIAL_RECOGNITION",
                isActive: true,
                deviceInfo: "iPhone 14 Pro - iOS 17.1.1",
                ipAddress: "192.168.1.100",
                userAgent:
                    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X)",
                createdAt: "2024-01-15T08:05:30.000Z",
                updatedAt: "2024-01-15T08:05:30.000Z",
                expiresAt: "2024-01-22T08:05:30.000Z",
            },
            {
                id: "clp1s3t4u5v6w7x8y9z0a1b2",
                adminId: "clp1a2b3c4d5e6f7g8h9i0j1",
                method: "FORM",
                isActive: false,
                deviceInfo: "MacBook Pro - macOS 14.1",
                ipAddress: "192.168.1.105",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                createdAt: "2024-01-14T16:30:00.000Z",
                updatedAt: "2024-01-14T20:45:00.000Z",
                expiresAt: "2024-01-21T16:30:00.000Z",
            },
        ],
    },
    {
        id: "clp2b3c4d5e6f7g8h9i0j1k2",
        username: "sophia.martinez",
        password:
            "$2b$12$YHKpJKLMN8oODOJKLMNdOeP9Q5c8uVFqOhKbKqc4pDjXrFzBtUhyK", // hashed: "password123"
        role: "ADMIN",
        createdAt: "2024-01-16T09:30:00.000Z",
        updatedAt: "2024-01-16T09:30:00.000Z",
        sessions: [
            {
                id: "clp2t3u4v5w6x7y8z9a0b1c2",
                adminId: "clp2b3c4d5e6f7g8h9i0j1k2",
                method: "FORM",
                isActive: true,
                deviceInfo: "MacBook Pro M2 - macOS 14.1",
                ipAddress: "192.168.1.101",
                userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                createdAt: "2024-01-16T09:35:15.000Z",
                updatedAt: "2024-01-16T09:35:15.000Z",
                expiresAt: "2024-01-23T09:35:15.000Z",
            },
        ],
    },
    {
        id: "clp3c4d5e6f7g8h9i0j1k2l3",
        username: "marcus.johnson",
        password:
            "$2b$12$XGFpIJKLMN7nNDNJKLMNcNeO8P5b7tUEpNgJaJpb3oCiWqEyAsSgJ", // hashed: "secure456"
        role: "ADMIN",
        createdAt: "2024-01-17T10:15:00.000Z",
        updatedAt: "2024-01-17T10:15:00.000Z",
        adminFacial: {
            id: "clp3h4i5j6k7l8m9n0o1p2q3",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            adminId: "clp3c4d5e6f7g8h9i0j1k2l3",
            isActive: true,
            deviceInfo: "Dell Laptop - Windows 11 - Edge 118.0.2088.46",
            createdAt: "2024-01-17T10:16:00.000Z",
            updatedAt: "2024-01-17T10:16:00.000Z",
        },
        sessions: [
            {
                id: "clp3u4v5w6x7y8z9a0b1c2d3",
                adminId: "clp3c4d5e6f7g8h9i0j1k2l3",
                method: "FACIAL_RECOGNITION",
                isActive: true,
                deviceInfo: "Dell Laptop - Windows 11",
                ipAddress: "192.168.1.102",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                createdAt: "2024-01-17T10:20:00.000Z",
                updatedAt: "2024-01-17T10:20:00.000Z",
                expiresAt: "2024-01-24T10:20:00.000Z",
            },
        ],
    },
    {
        id: "clp4d5e6f7g8h9i0j1k2l3m4",
        username: "elena.rodriguez",
        password:
            "$2b$12$ZKGqJLMNO8pPEQKLNOeOdPfQ6d9vWGrPiLcLrd5qEkYsGzCtVjzL", // hashed: "elena789"
        role: "ADMIN",
        createdAt: "2024-01-18T11:20:00.000Z",
        updatedAt: "2024-01-18T11:20:00.000Z",
        adminFacial: {
            id: "clp4i5j6k7l8m9n0o1p2q3r4",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            adminId: "clp4d5e6f7g8h9i0j1k2l3m4",
            isActive: true,
            deviceInfo: "iPad Pro 12.9 - iPadOS 17.1 - Safari 17.1",
            createdAt: "2024-01-18T11:25:00.000Z",
            updatedAt: "2024-01-18T11:25:00.000Z",
        },
        sessions: [
            {
                id: "clp4v5w6x7y8z9a0b1c2d3e4",
                adminId: "clp4d5e6f7g8h9i0j1k2l3m4",
                method: "FACIAL_RECOGNITION",
                isActive: true,
                deviceInfo: "iPad Pro 12.9 - iPadOS 17.1",
                ipAddress: "192.168.1.103",
                userAgent: "Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X)",
                createdAt: "2024-01-18T11:30:00.000Z",
                updatedAt: "2024-01-18T11:30:00.000Z",
                expiresAt: "2024-01-25T11:30:00.000Z",
            },
        ],
    },
    {
        id: "clp5e6f7g8h9i0j1k2l3m4n5",
        username: "david.chen",
        password:
            "$2b$12$AKHrKMNOP9qQFRLOPfPeQgR7e0wXHsQjMdDmse6rFlZtH0DuWk0M", // hashed: "david2024"
        role: "ADMIN",
        createdAt: "2024-01-19T14:45:00.000Z",
        updatedAt: "2024-01-19T14:45:00.000Z",
        adminFacial: {
            id: "clp5j6k7l8m9n0o1p2q3r4s5",
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
            adminId: "clp5e6f7g8h9i0j1k2l3m4n5",
            isActive: true,
            deviceInfo: "Samsung Galaxy S23 - Android 14 - Chrome 118.0.5993.112",
            createdAt: "2024-01-19T14:50:00.000Z",
            updatedAt: "2024-01-19T14:50:00.000Z",
        },
        sessions: [
            {
                id: "clp5w6x7y8z9a0b1c2d3e4f5",
                adminId: "clp5e6f7g8h9i0j1k2l3m4n5",
                method: "FORM",
                isActive: false,
                deviceInfo: "Samsung Galaxy S23 - Android 14",
                ipAddress: "192.168.1.104",
                userAgent: "Mozilla/5.0 (Linux; Android 14; SM-S911B)",
                createdAt: "2024-01-19T14:55:00.000Z",
                updatedAt: "2024-01-19T22:10:00.000Z",
                expiresAt: "2024-01-26T14:55:00.000Z",
            },
        ],
    },
    {
        id: "clp6f7g8h9i0j1k2l3m4n5o6",
        username: "isabella.wright",
        password:
            "$2b$12$BKIsLNOPQ0rRGSMPgQfQhSs8f1yYItRkNeDnoF7sGm0uI1EvXl1N", // hashed: "bella456"
        role: "ADMIN",
        createdAt: "2024-01-20T16:30:00.000Z",
        updatedAt: "2024-01-20T16:30:00.000Z",
        adminFacial: {
            id: "clp6k7l8m9n0o1p2q3r4s5t6",
            image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=400&h=400&fit=crop&crop=face",
            adminId: "clp6f7g8h9i0j1k2l3m4n5o6",
            isActive: false,
            deviceInfo: "Surface Laptop 5 - Windows 11 - Firefox 119.0.1",
            createdAt: "2024-01-20T16:35:00.000Z",
            updatedAt: "2024-01-20T16:35:00.000Z",
        },
        sessions: [
            {
                id: "clp6x7y8z9a0b1c2d3e4f5g6",
                adminId: "clp6f7g8h9i0j1k2l3m4n5o6",
                method: "FORM",
                isActive: false,
                deviceInfo: "Surface Laptop 5 - Windows 11",
                ipAddress: "192.168.1.106",
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0)",
                createdAt: "2024-01-20T16:40:00.000Z",
                updatedAt: "2024-01-20T19:25:00.000Z",
                expiresAt: "2024-01-27T16:40:00.000Z",
            },
        ],
    },
    {
        id: "clp7g8h9i0j1k2l3m4n5o6p7",
        username: "thomas.anderson",
        password:
            "$2b$12$CKJtMOPQR1sSHTNQhRgRiTt9g2zZJuSlOfEopG8tHn1vJ2FwYm2O", // hashed: "neo123"
        role: "ADMIN",
        createdAt: "2024-01-21T13:15:00.000Z",
        updatedAt: "2024-01-21T13:15:00.000Z",
        adminFacial: null,
        sessions: [
            {
                id: "clp7y8z9a0b1c2d3e4f5g6h7",
                adminId: "clp7g8h9i0j1k2l3m4n5o6p7",
                method: "FORM",
                isActive: true,
                deviceInfo: "Lenovo ThinkPad X1 - Ubuntu 22.04",
                ipAddress: "192.168.1.107",
                userAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:119.0)",
                createdAt: "2024-01-21T13:20:00.000Z",
                updatedAt: "2024-01-21T13:20:00.000Z",
                expiresAt: "2024-01-28T13:20:00.000Z",
            },
        ],
    },
];