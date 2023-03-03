export type Chat = {
    participants: string[];
    name?: string;
}

export type Message = {
    sender: string;
    text: string;
    date: Date;
}

export type Conversation = {
    participants: string[];
    messages: Message[];
}

export enum StorageKeys {
    CHATS = "chats",
    CONVERSATIONS = "conversations"
}