require "bundler"

Bundler::GemHelper.install_tasks

require "sprockets"

desc "Compile assets"
task :compile_assets do
  assets = Sprockets::Environment.new
  assets.append_path "."
  Dir.glob "**/*.coffee" do |path|
    puts "Compiling #{path}"
    asset = assets[path]
    asset.write_to asset.logical_path
  end
end

task build: :compile_assets