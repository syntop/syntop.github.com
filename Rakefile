require 'erb'
require 'json'


PROJECTS_FILE = './projects.json'
COMPASS_CONFIG_TEMPLATE = './sass/_config.scss.erb'
COMPASS_CONFIG_FILE = './sass/_config.scss'

task :default do
  json_data = File.open(PROJECTS_FILE).read()
  projects = JSON.parse(json_data)
  template = ERB.new File.read(COMPASS_CONFIG_TEMPLATE)
  
  File.open(File.join(COMPASS_CONFIG_FILE), "w") do |f|
    f.write(template.result(binding))
  end
  
  exec "compass compile"
end
