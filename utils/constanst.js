import {
  TbSortAscending,
  TbSortAscendingLetters,
  TbSortDescending,
  TbSortDescendingLetters,
} from 'react-icons/tb';

export const email = 'faisal@gmail.com';

export const sortMenu = [
  {
    label: 'Terbaru',
    icons: (active) => (
      <TbSortDescending
        className={`${active ? 'text-white' : 'text-primary'}`}
        size={18}
        data-cy='sort-selection-icon'
      />
    ),
    key: 'newest',
  },
  {
    label: 'Terlama',
    icons: (active) => (
      <TbSortAscending
        className={`${active ? 'text-white' : 'text-primary'}`}
        size={18}
        data-cy='sort-selection-icon'
      />
    ),
    key: 'oldest',
  },
  {
    label: 'A-Z',
    icons: (active) => (
      <TbSortAscendingLetters
        className={`${active ? 'text-white' : 'text-primary'}`}
        size={18}
        data-cy='sort-selection-icon'
      />
    ),
    key: 'az',
  },
  {
    label: 'Z-A',
    icons: (active) => (
      <TbSortDescendingLetters
        className={`${active ? 'text-white' : 'text-primary'}`}
        size={18}
        data-cy='sort-selection-icon'
      />
    ),
    key: 'za',
  },
];

export const priority = [
  { name: 'Very High', color: 'bg-danger', value: 'very-high' },
  { name: 'High', color: 'bg-warning', value: 'high' },
  { name: 'Medium', color: 'bg-success', value: 'normal' },
  { name: 'Low', color: 'bg-info', value: 'low' },
  { name: 'Very Low', color: 'bg-purple', value: 'very-low' },
];
