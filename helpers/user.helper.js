const nameNormalizator = (name = '') => {
  if (!name) {
    return '';
  }

  name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Crème Brulée -> Creme Brulee
  name = name.replace(/[.,{}<>?$@%+&'":*-]/g, ' ');
  name = name.split(' ').filter((char) => !!char); // Creme      Brulee => [Creme,Brulee]
  name = name.join(' ').trim().toUpperCase();

  return name;
};

module.exports = {
  nameNormalizator
};
