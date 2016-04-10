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

#Roadmap / ToDos (in no particular order)
* [] Use substack/node-resolve in `read-patterns` to find entry-files
* [] Build `Core` which uses `find-patterns` and `read-patterns` to generate initial  
[pattern tree](tree.md).
* [] parse JavaScript and CSS files to find dependencies between patterns
* [] Use `addDependency` and `removeDependency` to add edges between the pattern nodes.
* [] Implement parsing of JS, CSS and Markdown as replaceable plugins / transforms.
* [] Use chokidar to recursively watch pattern root folder and recursively  
update patterns / dependencies when files change.
* [] Use `react-docgen` to create `propTypes` documentation
* [] Use `react-markdown` to extract JSX code blocks from readme.md files and  
use them as demo to render a pattern.
* [] Generate "entry-file" by creating a JS file which "exports" all patterns  
as top-level objects.
* [] Build basic UI which displays navigation, name, path, props, readme and  
dependencies for each pattern.
* [] Extend the UI to also being able to render the requested pattern as a demo.
