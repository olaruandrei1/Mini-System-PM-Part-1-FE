import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class PmApiService {
    readonly pmAPIUrl = 'https://localhost:7214/api';

    constructor(private http: HttpClient) {}
    // for patients
    getPatientList(): Observable<any[]> {
        return this.http.get<any>(this.pmAPIUrl + '/Patients');
    }
    addPatient(data: any) {
        return this.http.post<any>(this.pmAPIUrl + '/Patients', data);
    }
    updatePatient(id: number | string, data: any) {
        return this.http.put<any>(this.pmAPIUrl + `/Patients/${id}`, data);
    }
    deletePatient(id: number | string) {
        return this.http.delete<any>(this.pmAPIUrl + `/Patients/${id}`);
    }
    // for departments
    getDepartmentList(): Observable<any[]> {
        return this.http.get<any>(this.pmAPIUrl + '/departments');
    }
    addDepartment(data: any) {
        return this.http.post<any>(this.pmAPIUrl + '/departments', data);
    }
    updateDepartment(id: number | string, data: any) {
        return this.http.put<any>(this.pmAPIUrl + `/departments/${id}`, data);
    }
    deleteDepartment(id: number | string) {
        return this.http.delete<any>(this.pmAPIUrl + `/departments/${id}`);
    }
    // for hospitalization status
    getStatusHosList(): Observable<any[]> {
        return this.http.get<any>(this.pmAPIUrl + '/StatusHos');
    }
    addStatusHos(data: any) {
        return this.http.post<any>(this.pmAPIUrl + '/StatusHos', data);
    }
    updateStatusHos(id: number | string, data: any) {
        return this.http.put<any>(this.pmAPIUrl + `/StatusHos/${id}`, data);
    }
    deleteStatusHos(id: number | string) {
        return this.http.delete<any>(this.pmAPIUrl + `/StatusHos/${id}`);
    }
}
