import { GB2260 } from './identity.data';

export const extractInfo = (idNo: string): any => {
  const addrPart = idNo.substring(0, 6);
  const birthPart = idNo.substring(6, 14);

  return {
    addrCode: addrPart,
    dateOfBirth: birthPart,
  };
};

export const isValidAddr = (addr: string): boolean => {
  return GB2260[addr] !== undefined;
};

export const getAddrByCode = (code: string): any => {
  const provinceStr = GB2260[code.substring(0, 2) + '0000'];
  const cityStr = GB2260[code.substring(0, 4) + '00'];
  const districtStr = GB2260[code];
  const city = cityStr.replace(provinceStr, '');
  const district = districtStr.replace(cityStr, '');
  return {
    province: provinceStr,
    city,
    district,
  };
};
