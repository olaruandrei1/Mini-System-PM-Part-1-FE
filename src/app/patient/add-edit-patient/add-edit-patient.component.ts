import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PmApiService } from 'src/app/pm-api.service';
@Component({
    selector: 'app-add-edit-patient',
    templateUrl: './add-edit-patient.component.html',
    styleUrls: ['./add-edit-patient.component.css'],
})
export class AddEditPatientComponent implements OnInit {
    patientList$!: Observable<any[]>;
    departmentList$!: Observable<any[]>;
    statusHosList$!: Observable<any[]>;

    constructor(private service: PmApiService) {}

    @Input() patient: any;
    id: number = 0;
    statusHos: string = '';
    firstLastNamePatient: string = '';
    departmentId!: number;

    ngOnInit(): void {
        this.id = this.patient.id;
        this.statusHos = this.patient.statusHos;
        this.firstLastNamePatient = this.patient.firstLastNamePatient;
        this.departmentId = this.patient.departmentId;
        this.statusHosList$ = this.service.getStatusHosList();
        this.patientList$ = this.service.getPatientList();
        this.departmentList$ = this.service.getDepartmentList();
    }
    addPatient() {
        let patient = {
            statusHos: this.statusHos,
            firstLastNamePatient: this.firstLastNamePatient,
            departmentId: this.departmentId,
        };
        this.service.addPatient(patient).subscribe((res) => {
            let closeModal = document.getElementById('add-edit-modal-close');
            if (closeModal) {
                closeModal.click();
            }

            let alertAdded = document.getElementById('add-success-alert');
            if (alertAdded) {
                alertAdded.style.display = 'block';
            }
            setTimeout(() => {
                if (alertAdded) {
                    alertAdded.style.display = 'none';
                }
            }, 6000);
        });
    }

    updatePatient() {
        let patient = {
            id: this.id,
            statusHos: this.statusHos,
            firstLastNamePatient: this.firstLastNamePatient,
            departmentId: this.departmentId,
        };
        let id: number = this.id;
        this.service.updatePatient(id, patient).subscribe((res) => {
            let closeModal = document.getElementById('add-edit-modal-close');
            if (closeModal) {
                closeModal.click();
            }

            let alertUpdate = document.getElementById('update-success-alert');
            if (alertUpdate) {
                alertUpdate.style.display = 'block';
            }
            setTimeout(() => {
                if (alertUpdate) {
                    alertUpdate.style.display = 'none';
                }
            }, 6000);
        });
    }
}
