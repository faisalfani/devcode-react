import moment from 'moment';

export const activityDateFormat = (date) =>
  moment(date).locale('id').format('DD MMMM YYYY');
