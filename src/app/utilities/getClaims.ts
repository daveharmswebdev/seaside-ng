import { Claim } from '../profile/profile.component';

export const getClaims = (claims: any) => {
  let list: Claim[] = new Array<Claim>();

  Object.keys(claims).forEach(function (k, v) {
    let c = new Claim();
    c.id = v;
    c.claim = k;
    c.value = claims ? claims[k] : null;
    list.push(c);
  });

  return list;
};
