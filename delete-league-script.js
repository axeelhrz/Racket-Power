// Script para eliminar "Liga Axeleewe" de la base de datos de producción
// Ejecutar con: node delete-league-script.js

const https = require('https');

const deleteLeague = async (leagueName) => {
    const apiUrl = 'https://backendd-production-8e3b.up.railway.app';
    const endpoint = `/api/admin/delete-league/${encodeURIComponent(leagueName)}`;
    
    const options = {
        hostname: 'backendd-production-8e3b.up.railway.app',
        port: 443,
        path: endpoint,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'League-Cleanup-Script/1.0'
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    resolve({
                        statusCode: res.statusCode,
                        data: response
                    });
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        data: data
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
};

// Ejecutar el script
(async () => {
    try {
        console.log('🔄 Intentando eliminar "Liga Axeleewe" de la base de datos de producción...');
        
        const result = await deleteLeague('Liga Axeleewe');
        
        console.log(`📊 Status Code: ${result.statusCode}`);
        console.log('📋 Respuesta:', JSON.stringify(result.data, null, 2));
        
        if (result.statusCode === 200 && result.data.success) {
            console.log('✅ Liga eliminada exitosamente!');
            if (result.data.deleted_admin_user) {
                console.log(`👤 Usuario admin eliminado: ${result.data.deleted_admin_user}`);
            }
        } else if (result.statusCode === 404) {
            console.log('⚠️  Liga no encontrada en la base de datos');
        } else if (result.statusCode === 422) {
            console.log('❌ No se puede eliminar la liga porque tiene clubes asociados');
        } else {
            console.log('❌ Error al eliminar la liga');
        }
        
    } catch (error) {
        console.error('💥 Error ejecutando el script:', error.message);
    }
})();