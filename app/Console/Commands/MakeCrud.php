<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class MakeCrud extends Command
{
    protected $signature = 'make:crud {name}';
    protected $description = 'Generate CRUD files (Model, Controller, Migration, Seeder, Request, Resource, Views)';

    public function handle()
    {
        $name = Str::studly($this->argument('name'));        // เช่น Post
        $table = Str::snake(Str::pluralStudly($name));       // posts
        $className = $name;
        $controller = "{$className}Controller";

        // paths
        $stubPath = base_path('stubs/crud');
        $modelPath = app_path("Models/{$className}.php");
        $controllerPath = app_path("Http/Controllers/{$controller}.php");
        $requestPath = app_path("Http/Requests/{$className}Request.php");
        $resourcePath = app_path("Http/Resources/{$className}Resource.php");
        $migrationPath = database_path("migrations/".date('Y_m_d_His')."_create_{$table}_table.php");
        $seederPath = database_path("seeders/{$className}Seeder.php");

        // เพิ่ม path ของ frontend
        $frontendPath = resource_path("js/Pages/{$className}");
        $componentPath = resource_path("js/Components/{$className}Form.tsx");
        
        $this->generateFile("{$stubPath}/index.stub", "{$frontendPath}/Index.tsx", [
            'DummyClass' => $className,
            'DummyTable' => $table,
        ]);

        $this->generateFile("{$stubPath}/form.stub", $componentPath, [
            'DummyClass' => $className,
        ]);

        // generate files
        $this->generateFile("{$stubPath}/model.stub", $modelPath, [
            'DummyClass' => $className,
            'DummyTable' => $table,
        ]);

        $this->generateFile("{$stubPath}/controller.stub", $controllerPath, [
            'DummyClass' => $className,
            'DummyController' => $controller,
            'DummyResource' => "{$className}Resource",
            'DummyRequest' => "{$className}Request",
        ]);

        $this->generateFile("{$stubPath}/request.stub", $requestPath, [
            'DummyClass' => "{$className}Request",
        ]);

        $this->generateFile("{$stubPath}/resource.stub", $resourcePath, [
            'DummyClass' => "{$className}Resource",
        ]);

        $this->generateFile("{$stubPath}/migration.stub", $migrationPath, [
            'DummyTable' => $table,
        ]);

        $this->generateFile("{$stubPath}/seeder.stub", $seederPath, [
            'DummyClass' => "{$className}Seeder",
            'DummyModel' => $className,
        ]);

        $this->generateFile("{$stubPath}/columns.stub", resource_path("js/columns/{$className}Columns.tsx"), []);

        $this->info("CRUD for {$className} generated successfully!");
    }

    protected function generateFile($stub, $path, $replacements)
    {
        $content = File::get($stub);
        foreach ($replacements as $key => $value) {
            $content = str_replace($key, $value, $content);
        }

        File::ensureDirectoryExists(dirname($path));
        File::put($path, $content);

        $this->line("Created: {$path}");
    }
}
