var docs = [
  {{ range $index, $page := (where site.RegularPages "Type" "in" site.Params.mainSections) -}}
    {
      id: {{ $index }},
      href: "{{ .RelPermalink | relURL }}",
      title: {{ .Title | jsonify }},
      description: {{ .Params.description | jsonify }},
      content: {{ .Content | jsonify }}
    },
  {{ end -}}
];
