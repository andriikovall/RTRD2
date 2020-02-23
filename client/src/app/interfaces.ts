export interface User {
    _id?: string
    login: string
    password: string
    email?: string
    firstName?: string
    lastName?: string
    telegram?: string
    role?: string
    visitedEvents?: string[]
    totalDonation?: number
}

export interface Message {
    message: string
}

export interface Token {
    token: string
}

export interface Event {
    _id?: string
    name?: string
    bio?: string
    author?: string
    vote?: number
    isActive?: boolean
    sponsors?: Sponsor[]
    region?: string
    date?: string
}

export interface Sponsor {
    user: string
    cost: number
}
