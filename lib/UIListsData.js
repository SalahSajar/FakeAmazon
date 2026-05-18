// Site Languages List
const languages = [
	{
		langCode: "en",
		title: "English - EN"
	},
	{
		langCode: "es",
		title: "español - ES"
	},
	{
		langCode: "ar",
		title: "العربية - AR"
	},
	{
		langCode: "de",
		title: "Deutsch - DE"
	},
	{
		langCode: "ko",
		title: "한국어 - KO"
	},
	{
		langCode: "pt",
		title: "português - PT"
	},
	{
		langCode: "zh",
		title: "中文 (简体) - ZH"
	}
]
export const languagesObj = {
	languages, 
	availableLanguages: languages.map(lang => lang.langCode)
}