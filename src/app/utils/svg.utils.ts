import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (
  iconRegister: MatIconRegistry,
  sanitizer: DomSanitizer
) => {
  iconRegister.addSvgIcon(
    'doctor',
    sanitizer.bypassSecurityTrustResourceUrl('assets/icons/doctor.svg')
  );
};
