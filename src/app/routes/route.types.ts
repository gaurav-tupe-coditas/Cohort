import type { Router } from "express";

export class Route{
    static RegisteredPaths:string[] = []
    constructor(public path:string,public router:Router){
        if(!path.startsWith("/"))throw "Path name is invalid";
        if(Route.RegisteredPaths.includes(path))throw "Path is already registered"
        Route.RegisteredPaths.push(path)
    }
}

export type Routes = Route[]