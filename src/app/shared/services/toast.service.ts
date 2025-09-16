import { Injectable } from '@angular/core';
import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
    private actions = {
        create: 'creado',
        update: 'actualizado',
        delete: 'eliminado',
        list: 'listado',
        find: 'encontrado',
    };
    constructor(private messageService: MessageService) {}

    add(data: ToastMessageOptions) {
        this.messageService.add({ ...data, key: 'main' });
    }

    success(type: 'create' | 'update' | 'delete' | 'list', detail?: string) {
        const action = this.actions[type];
        this.add({
            severity: 'success',
            summary: 'Hecho',
            detail: detail || `El registro ha sido ${action}`,
        });
    }
    error(
        type: 'create' | 'update' | 'delete' | 'list',
        detail?: string,
        code?: number,
    ) {
        const action = this.actions[type];
        this.add({
            severity: code === 403 ? 'info' : 'error',
            summary: 'Error',
            detail: detail || `El registro no ha sido ${action}`,
        });
    }

    updateSuccess(message?: string) {
        this.success('update', message);
    }

    createSuccess(message?: string) {
        this.success('create', message);
    }

    deleteSuccess(message?: string) {
        this.success('delete', message);
    }

    listSuccess(message?: string) {
        this.success('list', message);
    }
    

    updateError(message?: string, code?: number) {
        this.error('update', message, code);
    }

    createError(message?: string, code?: number) {
        this.error('create', message, code);
    }

    deleteError(message?: string, code?: number) {
        this.error('delete', message, code);
    }

    listError(message?: string, code?: number) {
        this.error('list', message, code);
    }
}
