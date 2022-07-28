import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-air-balloon-1',
    label: 'menu.gogo',
    to: `${adminRoot}/gogo`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/gogo/start`,
      },
    ],
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: `${adminRoot}/second-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: `${adminRoot}/second-menu/second`,
      },
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.menu1',
        to: `${adminRoot}/second-menu/menu1`,
      }, {
        icon: 'simple-icon-paper-plane',
        label: 'menu.menu2',
        to: `${adminRoot}/second-menu/menu2`,
      }
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'parentmenu',
    icon: 'iconsminds-bucket',
    label: 'menu.parent-menu',
    to: `${adminRoot}/parent-menu`,
  },
  {
    id: 'view',
    icon: 'iconsminds-bucket',
    label: 'menu.sample',
    to: `${adminRoot}/sample-form`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
  {
    id: 'formbuilder',
    icon: 'iconsminds-bucket',
    label: 'menu.form-builder',
    to: `${adminRoot}/form-builder`,
  },
  {
    id: 'viewType',
    icon: 'iconsminds-bucket',
    label: 'menu.view-type',
    to: `${adminRoot}/view-type`,
  },
  {
    id: 'viewTable',
    icon: 'iconsminds-bucket',
    label: 'menu.view-table',
    to: `${adminRoot}/view-table`,
  },
  {
    id: 'countryCreate',
    icon: 'iconsminds-bucket',
    label: 'menu.country-create',
    to: `${adminRoot}/country-create`,
  },
  {
    id: 'listView',
    icon: 'iconsminds-bucket',
    label: 'menu.list-view',
    to: `${adminRoot}/list-view`,
  },
];
export default data;
