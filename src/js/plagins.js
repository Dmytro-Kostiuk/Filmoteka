/**
 * адаптирует запрос к сервису под нужные параметры (page, perPage).
 * Принимает параметром объект с ключами:
 *
 * doFetch - асинхронная функуия обращения к сервису,
 * возращает список объектов для дальнейшей обработки;
 *
 * sPerPage - кол-во объектов, которые возвращает функуия doFetch;
 *
 * perPage - кол-во объектов, которые мы хотим видеть на странице;
 *
 * page - текущая страница.
 *
 *
 */
export async function adoptPPFetch({ page, perPage, sPerPage = 20, doFetch }) {
  const from = (page - 1) * perPage;
  const to = page * perPage;
  let results = [];
  let buffer = [];

  // --------------------------------------------------------
  // первый запрос,
  // нам нужно 0..8(< 9),
  // сервис вернет 0..19(< 20)
  //
  // [0,1..7,8,9,10..16,17,18,19]
  // [0,1..7,8]
  //
  // from = 0
  // to   = 9
  //
  // --------------------------------------------------------
  // второй запрос,
  // нам нужно 9..17 (<18),
  // сервис вернет 0..19(<20)
  //
  // [0,1..7,8,9,10..16,17,18,19]
  //          [9,10..16,17]
  //
  // from = 9
  // to   = 18
  //
  // --------------------------------------------------------
  // первый запрос,
  // нам нужно 18..26(<27),
  // два запроса к сервису,
  // сервис вернет  0..19(< 20)
  // сервис вернет 20..39(< 40)
  //
  // [0,1..7,8,9,10..16,17,18,19][20,21..25,26,27..38,39]
  //                      [18,19][20,21..25,26]
  //
  // from = 18
  // to   = 27
  //
  // --------------------------------------------------------

  //При первом запросе буфер заполняется на 20 объектов
  for (let i = from; i < to; ) {
    if (buffer[i]) {
      // значение по индексу существует
      results.push(buffer[i]);
      i++;
    } else {
      // загружаем следующую порцию данных

      // Math.floor так как необходима целая часть
      // от деления округленная в нижнюю сторону.
      const sp = Math.floor(i / sPerPage) + 1;
      const sResults = await doFetch(sp);
      const sFrom = (sp - 1) * sPerPage;
      const sTo = sp * sPerPage;
      let x = 0;
      for (let j = sFrom; j < sTo; j++) {
        const sResult = sResults[x++];
        buffer[j] = { sPage: sp, ...sResult };
      }
    }
  }
  return results;
}
