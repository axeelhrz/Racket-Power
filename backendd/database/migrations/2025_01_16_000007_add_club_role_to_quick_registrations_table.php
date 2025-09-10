<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quick_registrations', function (Blueprint $table) {
            // Agregar campo de rol en el club después del campo club_name
            $table->enum('club_role', ['ninguno', 'administrador', 'dueño'])
                  ->default('ninguno')
                  ->after('club_name')
                  ->comment('Rol de la persona en el club: ninguno (default), administrador, o dueño');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quick_registrations', function (Blueprint $table) {
            $table->dropColumn('club_role');
        });
    }
};