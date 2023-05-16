import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable
({
    providedIn: 'root'
})


export class ScreensService
{
    constructor(private http:HttpClient){}

    getAll()
    {
        return this.http.get(`http://localhost:3004/screen/get`);
    }

    delete(screen_id:any):Observable<any>
    {
       return this.http.delete(`http://localhost:3004/screen/delete/${screen_id}`);
    }

    getScreen(screen_id:any): Observable<any>
    {        
        return this.http.get(`http://localhost:3004/screen/get/${screen_id}`);
    }
}