/** @odoo-module */

import { registry } from '@web/core/registry';

import { formView } from '@web/views/form/form_view';
import { FormController } from '@web/views/form/form_controller';

import { useArchiveEmployee } from '@hr/views/archive_employee_hook';

export class EmployeeFormController extends FormController {
    setup() {
        super.setup();
        this.archiveEmployee = useArchiveEmployee();
    }

    getActionMenuItems() {
        const menuItems = super.getActionMenuItems();
        if (!this.archiveEnabled || !this.model.root.isActive) {
            return menuItems;
        }

        const archiveAction = menuItems.other.find((item) => item.key === "archive");
        if (archiveAction) {
            archiveAction.callback = this.archiveEmployee.bind(this, this.model.root.resId);
        }
        return menuItems;
    }
}

registry.category('views').add('hr_employee_form', {
    ...formView,
    Controller: EmployeeFormController,
});
