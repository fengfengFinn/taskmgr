import { city_data } from './area.data';

export const getProvinces = (): string[] => {
  const provinces = [];
  for (const data in city_data) {
    if (Object.prototype.hasOwnProperty.call(city_data, data)) {
      provinces.push(data);
    }
  }
  return provinces;
};

export const getCitiesByProvince = (province: string): string[] => {
  if (!province || !city_data[province]) {
    return [];
  }
  const cities = [];
  const val = city_data[province];

  for (const city in val) {
    if (Object.prototype.hasOwnProperty.call(val, city)) {
      cities.push(city);
    }
  }

  return cities;
};

export const getDistrictsByCity = (
  province: string,
  city: string
): string[] => {
  if (!province || !city_data[province] || !city_data[province][city]) {
    return [];
  }

  return city_data[province][city];
};
