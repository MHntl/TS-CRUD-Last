//! Custom Hook
//ihtiyacımıza göre kendi oluşturduğumuz ve görevlerini bizim belirlediğimiz Fn

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  //* 1.Adım     ************************************* */
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (!jsonValue) {
      return initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  });
  //*2.Adım  ****************************************** */
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //*3.Adım  ******************************************** */
  return [value, setValue] as [T, typeof setValue];
}

/*
1.Adımda: Bir state oluşturduk.State in başlangıç değerini koşula bağladık
BU koşula göre localStorage'da önceden bu veri varsa bulunan değeri al state'in başlangıç değeri yap
yoksa useLocalStorage Fn sine verilen 2.parametreyi state'in başlangıç değeri yap

2.Adımda key veya value değerlerinde bir değişiklik olması durumunda localStorage'a üstTarafta belirledigimiz state'i 
değer olarak ata.

3.Adımda Fn nin çağrıldığı yere verileri return et ve
as ile Type tanımlama yaptık Tuple medhodunu kullandık value için generic olarak tanımlana T yi aldık 
set Value için kendi zaten tanımlı olan(useState olduğu için react otomatik atıyor) tipini tanımladık

 */
