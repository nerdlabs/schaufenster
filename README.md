# schaufenster
stay tuned




Ziele
* Komponenten in Isolation anzeigen
* Ordnerstrutkur wird für hierarchische Navigation / IDs verwendet
* Komponenten sind self-contained
* Komponenten können mit jedem Build-Tool verwendet werden
* Informationen zum Pattern:
  * Rendering der Komponte mit Styling, Assets, Behaviour
  * Name                                                    (1)
  * Pfad (zur main file)                                    (1)
  * Props (falls vorhanden, react-docgen)                   (1)
  * Readme (gerendertes md)                                 (1)
  * Dependency Tree (depending, dependents)                 (1)
* Nice to have: Linter für Abhängigkeiten                   (1)

Umsetzung
* patterns sind: ordner mit package.json
* entry file folgt den node konventionen
* import ist unverändert im vgl. zu node
* Readme: wenn im pattern folder readme.md, anzeigen/rendern

# Architektur
----------
| 1 core | ---- fs comprehension, js parsing, markdown parsing (jsx demo)
----------
     |
---------------
| ui-renderer |  ---- rendering navigation, documentation, dependency tree, demos
---------------  ---- erzeugt browser-kompatiblen output
	- benutzt zentrale build-bundles vom fs (muss konfiguriert werden)
	- schreibt zentrale entry-file auf fs (hängt exports in global)
	- user provided html-grundgerüst
	- user konfiguriert publicRoot (fs-path)
	- user konfiguriert bundlePaths, werden eingebunden
	- patterns werden über eindeutige id referenziert


# Application life cycle
- configuration lesen
- patterns finden
- patterns parsen
