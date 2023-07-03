Příběh projektu USER GROUP

•	20/3: Dostaneme zadání 6-User Group

•	4/4: Zveřejněn kořenový adresář githubu a obecný popis projektu https://github.com/doucharm/UserGroup.git

•	10/4 První iterace projektu: Schopnost zobrazovat skupiny a členy a měnit název skupiny: Tato první iterace je nakódována v html a pouze pro některé základní funkce; data zatím nejsou brána v úvahu.

 
První verze
•	16/4 Druhá iterace: volba čistšího vzhledu a lepšího zobrazení funkcí.

•	17/4 Projektový den 1. Webová stránka je v současné době schopna zobrazovat skupiny nebo karty členů na základě vyhledávací lišty ID a přecházet mezi skupinami a podskupinami. Data jsou uložena lokálně a nejsou schopna složitých operací.
•	*zpětná vazba: přejmenování souborů

•	3/5 : Vzhledem k tomu, že data získaná ze serveru mají jiný formát a atributy, museli jsme původní kód smazat a jeho části použít k vytvoření nového vhodnějšího kódu.
	Byla vytvořena druhá větev githubu https://github.com/doucharm/UserGroup.git.

•	4/5 : Uvnitř bylo použito Redux store and dispatch actions pro ukládání dat ( v té době importovaných ze souboru ) a byly přidány reduktory pro případná tlačítka

•	6/5: Úspěšné načtení dat ze serveru GQL a vložení do store. Všechny budoucí odkazy budou vybírány ze store

•	8/5: Role jsou načteny do úložiště, aby bylo možné v nabídce možností vybrat roli pro každého člena

•	9/5: Vytvořen formulář pro přidání nového člena (bez mutace) a také tlačítko pro smazání člena.

•	10/5: Dokončení přidání nového člena do skladu

•	12/5: Vytvoření rozbalovacího seznamu rolí pro výběr rolí pro člena.

•	14/5: Přidejte komponenty User_Display, Search_Bar a přidejte upraveného uživatele na stránku uživatele na serveru.
•	16/5: Přidání podskupin do úložiště: Přidaná skupina nemá žádnou atributy =>potřeba přidat později
•	17/5: Přidat načítání uživatelů

•	18/5: Přidat membershipUpdate (spolupráce se serverem)

•	20/5: Vložení role pro uživatele (práce se serverem) a vytvoření GroupInsertMutaion pro vložení skupin na server.
•	22/5: Upravit vyhledávací panel, který umí vyhledávat uživatele podle jména, a vytvořit tlačítko pro zobrazení smazaných členství ve skupině
•	24/5: Upgrade vyhledávací lišty (stále jsou tam nějaké chyby)

•	24/5 Projektový den 2: Aplikace, které jsou v současné době schopné načítat data do úložiště a zobrazovat data ze serveru. Většina zamýšlených funkcí je dokončena, ale není optimalizována. Grafické zobrazení není apealing.
•	*Zpětná vazba: některé vnořené funkce musí být samostatnými funkcemi -> je potřeba přesunout funkci mimo ostatní funkce a předat potřebné argumenty.
  
•	25/5: Aktualizace uživatele podle písmene a vytvoření nové funkční role select pro členy: Funkce Role-Select umožňuje vymění pouze Roletype, v budoučnosti je potřeba přidat ještě nástroj pro výmění další atributy role

•	26/5: Dokončit vyhledávání uživatelů podle písmen a opravit chyby s vyhledávacím panelem
  

•	30/5: Změnit drobné úpravy manuálního skriptu pro User_Display a pročištění a přeskládání kódu

•	1/6: Vytvoření vlastní role pro členy ve skupině: Vlastní role se nemůže zobrazit při výběru role z rozbalovacího tlačítka, ale musí se zadat ručně pro každého jednotlivce. Je to proto, že vlastní role jsou pro každou skupinu speciální.

•	4/6: Nahrazení tlačítka a oprava chyby poslední změny v odebírání členství, chyba role 

•	7/6: Opraveny chyby s přesunem člena, změněn typ skupiny, aktualizován User_Display, vytvořeno tlačítko pro přesun člena do jiné skupiny a dokončeno tlačítko replace member

•	13/6: Odstranění podskupiny: Smazání podskupiny odstraní také členství v této skupině, role uživatele v této skupině. -> bugs byly nalezeny ale není fatalní k operaci tak necháme až později

•	14/6: Vyčištění kódu, oprava chyby při vytváření nové podskupiny a přidání komentářů k některým částem kódu.-> přidat komentáře na pozdější vygenerování jsdoc

•	15/6: Organizační schéma dokončeno, ale chybí mu kosmetické úpravy: Graf bude zobrazovat celou organizaci od nejvyšší skupiny po nejmenší.

	 Všechny funkce jsou dokončeny, ale bude třeba je optimalizovat. Je třeba doplnit komentáře, aby byl kód lépe čitelný.


•	19/6: Projektový den 3: Všechny funkce a tlačítka fungují, jak mají, vyskytla se nějaká drobná chyba, ale rychle se vyřeší. 
•	*Zpětná vazba: Aplikaci je třeba upravit tak, aby ji bylo možné začlenit do většího systému. Všechna tlačítka a funkce by měly být čistými funkcemi 
kvůli lepšímu rozboru kódu.


•	22/6: Přidán kalendář pro výběr data ukončení role člena.
•	=====
•	8 dní pauza na zkoušky
•	====

•	30/6->3/7: Celkové zlepšení kvality, oprava chyb a vyčištění kódu. Přidány komentáře a vygenerovány jsdoc dokumenty. 
•	 
 
 
Koneční produkt
•	4/7: Prezentace projektu

