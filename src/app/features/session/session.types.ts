export interface Question{
    id:string;
    courseId:string;
    askedBy:string;
    askedByName:string;
    text:string;
    answer:string | null;
    resolved?:boolean
}