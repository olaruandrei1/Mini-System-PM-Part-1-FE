import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PmApiService } from 'src/app/pm-api.service';

@Component({
    selector: 'app-show-patient',
    templateUrl: './show-patient.component.html',
    styleUrls: ['./show-patient.component.css'],
})
export class ShowPatientComponent implements OnInit {
    patientList$!: Observable<any[]>;
    departmentsList$!: Observable<any[]>;
    departmentsList: any = [];

    //data associated with fk
    departmentsMap: Map<number, string> = new Map();

    constructor(private service: PmApiService) {}

    ngOnInit(): void {
        this.patientList$ = this.service.getPatientList();
        this.departmentsList$ = this.service.getDepartmentList();
        this.refreshDepartmentMap();
    }
    //Title variable
    modalTitle: string = '';
    activateAddEditPatientComponent: boolean = false;
    patient: any;

    modalAdd() {
        this.patient = {
            id: 0,
            statusHos: null,
            FirstLastNamePatient: null,
            departmentId: null,
        };
        this.modalTitle = 'Add Patient';
        this.activateAddEditPatientComponent = true;
    }
    modalEdit(item: any) {
        this.patient = item;
        this.modalTitle = 'Edit Patient';
        this.activateAddEditPatientComponent = true;
    }
    modalClose() {
        this.activateAddEditPatientComponent = false;
        this.patientList$ = this.service.getPatientList();
    }

    refreshDepartmentMap() {
        this.service.getDepartmentList().subscribe((data) => {
            this.departmentsList = data;
            for (let i = 0; i < data.length; i++) {
                this.departmentsMap.set(
                    this.departmentsList[i].id,
                    this.departmentsList[i].departamentName
                );
            }
        });
    }
    delete(item: any) {
        if (
            confirm(
                `Are you sure you want to delete this patient named ${item.firstLastNamePatient}?`
            )
        ) {
            this.service.deletePatient(item.id).subscribe((res) => {
                let closeModal = document.getElementById(
                    'add-edit-modal-close'
                );
                if (closeModal) {
                    closeModal.click();
                }

                let alertDelete = document.getElementById(
                    'Delete-success-alert'
                );
                if (alertDelete) {
                    alertDelete.style.display = 'block';
                }
                setTimeout(() => {
                    if (alertDelete) {
                        alertDelete.style.display = 'none';
                    }
                }, 6000);
                this.patientList$ = this.service.getPatientList();
            });
        }
    }
}
