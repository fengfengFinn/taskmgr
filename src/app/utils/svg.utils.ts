import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const assestsDir = 'assets';
  const iconsDir = `${assestsDir}/icons`;
  const sideBarIconsDir = `${iconsDir}/sideBar`;
  const dayIconsDir = `${sideBarIconsDir}/days`;
  const avatarsDir = `${assestsDir}/avatar`;
  ir.addSvgIcon(
    'unassigned',
    ds.bypassSecurityTrustResourceUrl(`${avatarsDir}/unassigned.svg`)
  );
  ir.addSvgIconSetInNamespace(
    'avatars',
    ds.bypassSecurityTrustResourceUrl(`${avatarsDir}/avatars.svg`)
  );
  ir.addSvgIcon(
    'doctor',
    ds.bypassSecurityTrustResourceUrl('assets/icons/doctor.svg')
  );
  ir.addSvgIcon(
    'day',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/day.svg`)
  );
  ir.addSvgIcon(
    'month',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/month.svg`)
  );
  ir.addSvgIcon(
    'year',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/year.svg`)
  );
  ir.addSvgIcon(
    'project',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/project.svg`)
  );
  ir.addSvgIcon(
    'week',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/week.svg`)
  );
  ir.addSvgIcon(
    'projects',
    ds.bypassSecurityTrustResourceUrl(`${sideBarIconsDir}/projects.svg`)
  );

  const days = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];

  days.forEach((day) => {
    ir.addSvgIcon(
      `day${day}`,
      ds.bypassSecurityTrustResourceUrl(`${dayIconsDir}/day${day}.svg`)
    );
  });
};
