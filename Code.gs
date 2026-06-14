const APP_TITLE = 'Green Passport - St. Theresa Zero Waste';
const SPREADSHEET_ID = '1CB501XSK9SOA-OsGdDIYqPjxEoUYitKOFKlbpA4yHJ4';

const SHEETS = {
  records: 'WasteRecords',
  factors: 'CarbonFactors',
  scores: 'GameScores',
  summary: 'HouseholdSummary',
  settings: 'AdminSettings',
  adviceRules: 'AdviceRules',
  exportReports: 'ExportReports',
  starterKit: 'StarterKit',
  studentRoles: 'StudentDevRoles',
  privacyConsent: 'PrivacyConsent',
};

const HEADERS = {
  WasteRecords: [
    'Timestamp', 'StudentName', 'ClassName', 'StudentID', 'HouseholdName', 'ReportMonth',
    'GeneralWasteKg', 'RecycleWasteKg', 'OrganicWasteKg', 'HazardousWasteAmount',
    'PaperKg', 'PlasticBottleKg', 'CanKg', 'AluminumKg', 'SteelCanKg', 'ScrapIronKg', 'GlassBottleKg',
    'CompostFoodKg', 'BioExtractKg', 'FeedAnimalsKg',
    'ReducePlasticBagTimes', 'CarryBottleTimes', 'UseLunchBoxTimes', 'RefuseStrawTimes', 'CarryClothBagTimes',
    'RepairItemsTimes', 'DonateItemsTimes', 'DisposeBatteriesAmount', 'DisposeBulbsAmount', 'DisposeExpiredMedicineAmount',
    'TotalCO2e', 'EvidenceFolderLink', 'VideoLink', 'ReviewStatus', 'TeacherComment',
    'ConsentStatus', 'SubmittedAt', 'ReviewedBy', 'ReviewedAt'
  ],
  CarbonFactors: ['ActivityCode', 'ActivityName', 'Unit', 'EF', 'Source', 'Note'],
  GameScores: [
    'Timestamp', 'FullName', 'ClassName', 'StudentID', 'TeamName', 'TotalScore', 'TotalStars',
    'PlayerLevel', 'LatestStage', 'Badges', 'CertificateStatus'
  ],
  HouseholdSummary: [
    'HouseholdName', 'StudentName', 'ClassName', 'TotalSubmissions', 'TotalWasteKg', 'TotalManagedWasteKg',
    'TotalCO2e', 'GeneralWasteReductionPercent', 'OrganicWasteManagedPercent', 'BestImprovementScore',
    'ZeroWasteHomeStatus', 'CertificateStatus'
  ],
  AdminSettings: ['Key', 'Value', 'Description'],
  AdviceRules: ['RuleCode', 'Condition', 'AdviceForStudent', 'AdviceForParent', 'Priority', 'Active'],
  ExportReports: ['Timestamp', 'ReportType', 'RequestedBy', 'FileName', 'RowCount', 'Status', 'Note'],
  StarterKit: ['ItemCode', 'ItemName', 'Audience', 'Format', 'Description', 'Status'],
  StudentDevRoles: ['Step', 'RoleName', 'StudentEvidence', 'TeacherEvidence', 'Status'],
  PrivacyConsent: ['Timestamp', 'StudentName', 'ClassName', 'StudentID', 'HouseholdName', 'ConsentStatus', 'ConsentText'],
};

const FACTOR_ROWS = [
  ['PAPER_KG', 'ขายกระดาษ', 'kg', 0.92, 'School/IPCC proxy', 'ปรับค่า EF ได้ในชีต CarbonFactors'],
  ['PLASTIC_BOTTLE_KG', 'ขายขวดพลาสติก', 'kg', 1.45, 'School/IPCC proxy', 'รีไซเคิลพลาสติก'],
  ['CAN_KG', 'ขายกระป๋อง', 'kg', 1.02, 'School/IPCC proxy', 'กระป๋องโลหะทั่วไป'],
  ['ALUMINUM_KG', 'ขายอะลูมิเนียม', 'kg', 9.13, 'School/IPCC proxy', 'อะลูมิเนียมมีผลลดคาร์บอนสูง'],
  ['STEEL_CAN_KG', 'ขายกระป๋องเหล็ก', 'kg', 1.80, 'School/IPCC proxy', 'กระป๋องเหล็ก'],
  ['SCRAP_IRON_KG', 'ขายเศษเหล็ก', 'kg', 1.70, 'School/IPCC proxy', 'เศษเหล็ก'],
  ['GLASS_BOTTLE_KG', 'ขายขวดแก้ว', 'kg', 0.31, 'School/IPCC proxy', 'แก้วรีไซเคิล'],
  ['COMPOST_FOOD_KG', 'หมักเศษอาหารทำปุ๋ย', 'kg', 0.25, 'IPCC proxy', 'ลดเศษอาหารฝังกลบ'],
  ['BIO_EXTRACT_KG', 'ทำน้ำหมักชีวภาพ', 'kg', 0.20, 'IPCC proxy', 'ใช้กับเศษอาหาร/อินทรีย์'],
  ['FEED_ANIMALS_KG', 'นำเศษอาหารให้สัตว์', 'kg', 0.18, 'IPCC proxy', 'ลดเศษอาหารตกค้าง'],
  ['REDUCE_PLASTIC_BAG_TIMES', 'ลดใช้ถุงพลาสติก', 'time', 0.03, 'School proxy', 'ครั้งละประมาณ 1 ถุง'],
  ['CARRY_BOTTLE_TIMES', 'พกกระบอกน้ำส่วนตัว', 'time', 0.05, 'School proxy', 'ลดขวดน้ำใช้ครั้งเดียว'],
  ['USE_LUNCH_BOX_TIMES', 'ใช้กล่องข้าวส่วนตัว', 'time', 0.08, 'School proxy', 'ลดบรรจุภัณฑ์อาหาร'],
  ['REFUSE_STRAW_TIMES', 'ปฏิเสธหลอดพลาสติก', 'time', 0.01, 'School proxy', 'ลดหลอดพลาสติก'],
  ['CARRY_CLOTH_BAG_TIMES', 'พกถุงผ้า', 'time', 0.04, 'School proxy', 'ลดถุงพลาสติก'],
  ['REPAIR_ITEMS_TIMES', 'ซ่อมของใช้แทนการทิ้ง', 'time', 1.20, 'IPCC proxy', 'ยืดอายุการใช้งาน'],
  ['DONATE_ITEMS_TIMES', 'บริจาคของใช้', 'time', 0.80, 'IPCC proxy', 'ส่งต่อของที่ยังใช้ได้'],
  ['DISPOSE_BATTERIES_AMOUNT', 'ส่งถ่านไฟฉายเสื่อม', 'piece', 0.02, 'School guideline', 'ลดความเสี่ยงปนเปื้อน'],
  ['DISPOSE_BULBS_AMOUNT', 'ส่งหลอดไฟเสื่อม', 'piece', 0.04, 'School guideline', 'จัดการขยะอันตราย'],
  ['DISPOSE_EXPIRED_MEDICINE_AMOUNT', 'ส่งยาหมดอายุ', 'piece', 0.03, 'School guideline', 'ส่งต่อจุดรับที่ปลอดภัย']
];

const ACTIVITY_FIELD_TO_FACTOR = {
  PaperKg: 'PAPER_KG', PlasticBottleKg: 'PLASTIC_BOTTLE_KG', CanKg: 'CAN_KG', AluminumKg: 'ALUMINUM_KG',
  SteelCanKg: 'STEEL_CAN_KG', ScrapIronKg: 'SCRAP_IRON_KG', GlassBottleKg: 'GLASS_BOTTLE_KG',
  CompostFoodKg: 'COMPOST_FOOD_KG', BioExtractKg: 'BIO_EXTRACT_KG', FeedAnimalsKg: 'FEED_ANIMALS_KG',
  ReducePlasticBagTimes: 'REDUCE_PLASTIC_BAG_TIMES', CarryBottleTimes: 'CARRY_BOTTLE_TIMES',
  UseLunchBoxTimes: 'USE_LUNCH_BOX_TIMES', RefuseStrawTimes: 'REFUSE_STRAW_TIMES', CarryClothBagTimes: 'CARRY_CLOTH_BAG_TIMES',
  RepairItemsTimes: 'REPAIR_ITEMS_TIMES', DonateItemsTimes: 'DONATE_ITEMS_TIMES',
  DisposeBatteriesAmount: 'DISPOSE_BATTERIES_AMOUNT', DisposeBulbsAmount: 'DISPOSE_BULBS_AMOUNT',
  DisposeExpiredMedicineAmount: 'DISPOSE_EXPIRED_MEDICINE_AMOUNT'
};

function doGet() {
  setupGreenPassport();
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle(APP_TITLE)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function setupGreenPassport() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = getSpreadsheet_();
    Object.keys(HEADERS).forEach((name) => {
      const sheet = getOrCreateSheet_(ss, name);
      const headers = HEADERS[name];
      const current = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
      if (current.join('|') !== headers.join('|')) {
        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, headers.length).setBackground('#0f7a4f').setFontColor('#ffffff').setFontWeight('bold');
        sheet.autoResizeColumns(1, headers.length);
      }
    });
    seedIfEmpty_(SHEETS.factors, FACTOR_ROWS);
    seedIfEmpty_(SHEETS.settings, [
      ['AcademicYear', '2569', 'ปีการศึกษาปัจจุบัน'],
      ['OpenMonth', Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM'), 'เดือนที่เปิดรับข้อมูล'],
      ['AdminPIN', '2468', 'เปลี่ยนค่า PIN หลังติดตั้งจริง'],
      ['EvidenceRootFolderId', '', 'ใส่ Folder ID หากต้องการเก็บหลักฐานในโฟลเดอร์หลัก'],
      ['ZeroWasteCO2eTarget', '50', 'เกณฑ์ kgCO2e สะสมสำหรับ Zero Waste Home']
    ]);
    seedIfEmpty_(SHEETS.adviceRules, [
      ['GENERAL_HIGH', 'GeneralWasteKg > 8', 'ลดขยะทั่วไปด้วยกล่องข้าว แก้วน้ำ และถุงผ้าส่วนตัว', 'ช่วยกันเตรียมชุดพกพาลดขยะก่อนออกจากบ้าน', 1, 'Y'],
      ['ORGANIC_HIGH', 'OrganicWasteKg > 5', 'แยกเศษอาหารไปทำปุ๋ย น้ำหมัก หรืออาหารสัตว์', 'ตั้งถังเศษอาหารพร้อมป้ายวันที่', 2, 'Y'],
      ['RECYCLE_LOW', 'RecycleWasteKg < 3', 'ตรวจขวด กระดาษ กระป๋อง และแก้วก่อนทิ้งลงถังทั่วไป', 'จัดมุมรีไซเคิลเล็ก ๆ ที่บ้าน', 3, 'Y']
    ]);
    seedIfEmpty_(SHEETS.starterKit, [
      ['POSTER_SORTING', 'โปสเตอร์แยกขยะ 5 ประเภท', 'นักเรียน/ผู้ปกครอง', 'PDF/PNG', 'ใช้ติดบ้าน ห้องเรียน หรือมุม Zero Waste', 'พร้อมใช้'],
      ['HOME_CHECKLIST', 'Checklist Zero Waste Home', 'ครอบครัว', 'PDF', 'รายการตรวจตนเองรายสัปดาห์', 'พร้อมใช้'],
      ['CARBON_REFERENCE', 'เอกสารสูตรคำนวณและค่า EF', 'กรรมการ/ครู', 'PDF/Sheet', 'อธิบายสูตร kgCO2e และค่า EF', 'พร้อมใช้']
    ]);
    seedIfEmpty_(SHEETS.studentRoles, [
      [1, 'สำรวจปัญหา', 'ภาพ/บันทึกการสำรวจขยะ', 'ครูรับรองหัวข้อปัญหา', 'ดำเนินการแล้ว'],
      [2, 'ออกแบบระบบ', 'ภาพร่างหน้าจอและแบบฟอร์มข้อมูล', 'ครูให้คำแนะนำ', 'ดำเนินการแล้ว'],
      [3, 'ทดลองใช้', 'ภาพนักเรียนและผู้ปกครองทดลองบันทึก', 'ครูตรวจข้อมูลตัวอย่าง', 'ดำเนินการแล้ว'],
      [4, 'วิเคราะห์ผล', 'Dashboard และข้อค้นพบ', 'ครูตรวจสูตร', 'ดำเนินการแล้ว']
    ]);
    refreshHouseholdSummary();
  } finally {
    lock.releaseLock();
  }
}

function apiGetBootstrapData() {
  setupGreenPassport();
  return {
    title: APP_TITLE,
    settings: getPublicSettings_(),
    carbonFactors: rowsToObjects_(SHEETS.factors),
    wasteRecords: maskRecords_(rowsToObjects_(SHEETS.records, true)),
    gameScores: maskRecords_(rowsToObjects_(SHEETS.scores)),
    householdSummary: rowsToObjects_(SHEETS.summary),
    adviceRules: rowsToObjects_(SHEETS.adviceRules),
    starterKit: rowsToObjects_(SHEETS.starterKit),
    studentRoles: rowsToObjects_(SHEETS.studentRoles),
    dashboard: buildDashboard_()
  };
}

function apiSubmitWasteRecord(payload) {
  setupGreenPassport();
  validateRequired_(payload, ['StudentName', 'ClassName', 'StudentID', 'HouseholdName', 'ReportMonth']);
  const totalCO2e = calculateTotalCO2e_(payload, getFactorMap_());
  const rowObject = Object.assign({}, payload, {
    Timestamp: new Date(),
    TotalCO2e: round2_(totalCO2e),
    EvidenceFolderLink: payload.EvidenceFolderLink || '',
    VideoLink: payload.VideoLink || '',
    ReviewStatus: 'รอตรวจสอบ',
    TeacherComment: '',
    ConsentStatus: payload.ConsentStatus || 'ยินยอมเพื่อกิจกรรมโรงเรียน',
    SubmittedAt: new Date(),
    ReviewedBy: '',
    ReviewedAt: ''
  });
  appendObject_(SHEETS.records, rowObject);
  appendObject_(SHEETS.privacyConsent, {
    Timestamp: new Date(), StudentName: rowObject.StudentName || '', ClassName: rowObject.ClassName || '',
    StudentID: rowObject.StudentID || '', HouseholdName: rowObject.HouseholdName || '',
    ConsentStatus: rowObject.ConsentStatus || '', ConsentText: payload.ConsentText || 'ใช้ข้อมูลเพื่อกิจกรรม Green Passport ภายในโรงเรียน'
  });
  refreshHouseholdSummary();
  return { ok: true, totalCO2e: round2_(totalCO2e), message: makeAdvice_(rowObject), dashboard: buildDashboard_() };
}

function apiSaveGameScore(score) {
  setupGreenPassport();
  validateRequired_(score, ['FullName', 'ClassName', 'StudentID']);
  appendObject_(SHEETS.scores, Object.assign({}, score, {
    Timestamp: new Date(),
    TotalScore: Number(score.TotalScore || 0),
    TotalStars: Number(score.TotalStars || 0),
    CertificateStatus: score.CertificateStatus || ''
  }));
  return { ok: true, gameScores: maskRecords_(rowsToObjects_(SHEETS.scores)) };
}

function apiAdminLogin(pin) {
  return { ok: String(pin || '') === String(getSetting_('AdminPIN') || '') };
}

function apiAdminUpdateReview(pin, rowNumber, status, comment) {
  if (!apiAdminLogin(pin).ok) throw new Error('Admin PIN ไม่ถูกต้อง');
  const sheet = getSheet_(SHEETS.records);
  const headers = HEADERS.WasteRecords;
  sheet.getRange(Number(rowNumber), headers.indexOf('ReviewStatus') + 1).setValue(status);
  sheet.getRange(Number(rowNumber), headers.indexOf('TeacherComment') + 1).setValue(comment || '');
  const reviewerCol = headers.indexOf('ReviewedBy') + 1;
  const reviewedAtCol = headers.indexOf('ReviewedAt') + 1;
  if (reviewerCol > 0) sheet.getRange(Number(rowNumber), reviewerCol).setValue('ครูผู้ดูแลโครงการ');
  if (reviewedAtCol > 0) sheet.getRange(Number(rowNumber), reviewedAtCol).setValue(new Date());
  refreshHouseholdSummary();
  return { ok: true, wasteRecords: maskRecords_(rowsToObjects_(SHEETS.records, true)) };
}

function apiCreateCsvReport(pin, reportType) {
  if (!apiAdminLogin(pin).ok) throw new Error('Admin PIN ไม่ถูกต้อง');
  const reportMap = { records: SHEETS.records, scores: SHEETS.scores, summary: SHEETS.summary, impact: SHEETS.summary, advice: SHEETS.adviceRules, starterKit: SHEETS.starterKit, studentRoles: SHEETS.studentRoles, privacy: SHEETS.privacyConsent };
  const sheetName = reportMap[reportType] || SHEETS.records;
  const sheet = getSheet_(sheetName);
  const csv = sheet.getDataRange().getDisplayValues().map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const file = DriveApp.createFile(`${APP_TITLE} - ${sheetName}.csv`, csv, MimeType.CSV);
  appendObject_(SHEETS.exportReports, { Timestamp: new Date(), ReportType: reportType || 'records', RequestedBy: 'Admin', FileName: file.getName(), RowCount: Math.max(sheet.getLastRow() - 1, 0), Status: 'created', Note: `Source sheet: ${sheetName}` });
  return { ok: true, url: file.getUrl(), name: file.getName() };
}

function refreshHouseholdSummary() {
  const records = rowsToObjects_(SHEETS.records, true);
  const grouped = {};
  records.forEach((record) => {
    if (!record.HouseholdName) return;
    grouped[record.HouseholdName] = grouped[record.HouseholdName] || [];
    grouped[record.HouseholdName].push(record);
  });
  const rows = Object.keys(grouped).map((household) => {
    const items = grouped[household].sort((a, b) => String(a.ReportMonth).localeCompare(String(b.ReportMonth)));
    const first = items[0] || {};
    const latest = items[items.length - 1] || {};
    const totalWaste = sum_(items, ['GeneralWasteKg', 'RecycleWasteKg', 'OrganicWasteKg', 'HazardousWasteAmount']);
    const managedWaste = sum_(items, ['PaperKg', 'PlasticBottleKg', 'CanKg', 'AluminumKg', 'SteelCanKg', 'ScrapIronKg', 'GlassBottleKg', 'CompostFoodKg', 'BioExtractKg', 'FeedAnimalsKg']);
    const totalCO2e = sum_(items, ['TotalCO2e']);
    const generalReduction = percentReduction_(Number(first.GeneralWasteKg || 0), Number(latest.GeneralWasteKg || 0));
    const organicManaged = Number(latest.OrganicWasteKg || 0) > 0 ? (Number(latest.CompostFoodKg || 0) + Number(latest.BioExtractKg || 0) + Number(latest.FeedAnimalsKg || 0)) / Number(latest.OrganicWasteKg || 0) : 0;
    return [household, latest.StudentName || first.StudentName || '', latest.ClassName || first.ClassName || '', items.length, round2_(totalWaste), round2_(managedWaste), round2_(totalCO2e), round2_(generalReduction), round2_(organicManaged * 100), round2_(Math.max(generalReduction, organicManaged * 100, totalCO2e / 2)), totalCO2e >= Number(getSetting_('ZeroWasteCO2eTarget') || 50) ? 'ผ่านเกณฑ์ Zero Waste Home' : 'กำลังพัฒนา', totalCO2e >= 30 ? 'พร้อมออกเกียรติบัตร' : 'รอสะสมผลลัพธ์'];
  });
  const sheet = getSheet_(SHEETS.summary);
  if (sheet.getLastRow() > 1) sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.HouseholdSummary.length).clearContent();
  if (rows.length) sheet.getRange(2, 1, rows.length, HEADERS.HouseholdSummary.length).setValues(rows);
}

function buildDashboard_() {
  const records = rowsToObjects_(SHEETS.records, true);
  const households = rowsToObjects_(SHEETS.summary, true);
  const byMonth = {};
  records.forEach((r) => {
    const month = String(r.ReportMonth || 'ไม่ระบุ');
    byMonth[month] = byMonth[month] || { month, general: 0, recycle: 0, organic: 0, hazardous: 0, co2e: 0 };
    byMonth[month].general += Number(r.GeneralWasteKg || 0);
    byMonth[month].recycle += Number(r.RecycleWasteKg || 0);
    byMonth[month].organic += Number(r.OrganicWasteKg || 0);
    byMonth[month].hazardous += Number(r.HazardousWasteAmount || 0);
    byMonth[month].co2e += Number(r.TotalCO2e || 0);
  });
  return {
    householdCount: households.length,
    recordCount: records.length,
    totalWasteKg: round2_(sum_(records, ['GeneralWasteKg', 'RecycleWasteKg', 'OrganicWasteKg', 'HazardousWasteAmount'])),
    managedWasteKg: round2_(sum_(records, ['PaperKg', 'PlasticBottleKg', 'CanKg', 'AluminumKg', 'SteelCanKg', 'ScrapIronKg', 'GlassBottleKg', 'CompostFoodKg', 'BioExtractKg', 'FeedAnimalsKg'])),
    totalCO2e: round2_(sum_(records, ['TotalCO2e'])),
    monthSeries: Object.keys(byMonth).sort().map((key) => {
      const item = byMonth[key];
      Object.keys(item).forEach((field) => { if (field !== 'month') item[field] = round2_(item[field]); });
      return item;
    }),
    completedHouseholds: households.filter((h) => Number(h.TotalSubmissions || 0) >= 3).length,
    pendingHouseholds: households.filter((h) => Number(h.TotalSubmissions || 0) < 3).length,
    topHouseholds: households.sort((a, b) => Number(b.TotalCO2e || 0) - Number(a.TotalCO2e || 0)).slice(0, 10)
  };
}

function calculateTotalCO2e_(payload, factors) {
  return Object.keys(ACTIVITY_FIELD_TO_FACTOR).reduce((total, field) => total + Number(payload[field] || 0) * Number(factors[ACTIVITY_FIELD_TO_FACTOR[field]] || 0), 0);
}

function makeAdvice_(record) {
  if (Number(record.GeneralWasteKg || 0) > 10) return 'ลองลดขยะทั่วไปเพิ่มด้วยกล่องข้าว แก้วน้ำ และถุงผ้า';
  if (Number(record.OrganicWasteKg || 0) > Number(record.CompostFoodKg || 0) + Number(record.BioExtractKg || 0) + Number(record.FeedAnimalsKg || 0)) return 'ขยะอินทรีย์ยังสูง แนะนำให้ทำถังหมักปุ๋ยหรือน้ำหมักชีวภาพ';
  if (Number(record.TotalCO2e || 0) >= 20) return 'เยี่ยมมาก ครัวเรือนของคุณช่วยลดคาร์บอนได้แล้ว';
  return 'เริ่มต้นได้ดีมาก ลองเพิ่มกิจกรรมลดใช้และรีไซเคิลในเดือนถัดไป';
}

function seedIfEmpty_(sheetName, rows) {
  const sheet = getSheet_(sheetName);
  if (sheet.getLastRow() <= 1 && rows.length) sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function getSheet_(name) {
  return getOrCreateSheet_(getSpreadsheet_(), name);
}

function getOrCreateSheet_(ss, name) {
  const existing = ss.getSheetByName(name);
  if (existing) return existing;
  try {
    return ss.insertSheet(name);
  } catch (e) {
    const sheet = ss.getSheetByName(name);
    if (sheet) return sheet;
    throw e;
  }
}

function getSpreadsheet_() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActive();
}

function rowsToObjects_(sheetName, includeRowNumber) {
  const values = getSheet_(sheetName).getDataRange().getValues();
  const headers = values.shift() || [];
  return values.filter((row) => row.some((cell) => cell !== '')).map((row, index) => {
    const obj = includeRowNumber ? { _rowNumber: index + 2 } : {};
    headers.forEach((header, i) => { obj[header] = row[i]; });
    return obj;
  });
}

function appendObject_(sheetName, object) {
  const headers = HEADERS[sheetName];
  getSheet_(sheetName).appendRow(headers.map((header) => object[header] === undefined ? '' : object[header]));
}

function getFactorMap_() {
  return rowsToObjects_(SHEETS.factors).reduce((map, row) => {
    map[row.ActivityCode] = Number(row.EF || 0);
    return map;
  }, {});
}

function getSetting_(key) {
  const row = rowsToObjects_(SHEETS.settings).find((item) => item.Key === key);
  return row ? row.Value : '';
}

function getPublicSettings_() {
  return rowsToObjects_(SHEETS.settings).filter((row) => row.Key !== 'AdminPIN').reduce((map, row) => {
    map[row.Key] = row.Value;
    return map;
  }, {});
}

function maskRecords_(records) {
  return records.map((row) => {
    const copy = Object.assign({}, row);
    if (copy.StudentID) copy.StudentID = maskId_(copy.StudentID);
    return copy;
  });
}

function maskId_(id) {
  const text = String(id);
  return text.length <= 3 ? '***' : `${text.slice(0, 2)}***${text.slice(-2)}`;
}

function validateRequired_(payload, fields) {
  fields.forEach((field) => {
    if (!payload || payload[field] === undefined || payload[field] === '') throw new Error(`กรุณากรอก ${field}`);
  });
}

function sum_(rows, fields) {
  return rows.reduce((total, row) => total + fields.reduce((inner, field) => inner + Number(row[field] || 0), 0), 0);
}

function percentReduction_(first, latest) {
  if (!first) return 0;
  return ((first - latest) / first) * 100;
}

function round2_(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}
