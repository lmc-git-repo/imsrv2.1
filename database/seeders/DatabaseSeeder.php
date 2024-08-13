<?php

namespace Database\Seeders;

use App\Models\AccountUsers;
use App\Models\Departments;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Dan',
            'email' => 'dm.caravana092@gmail.com',
            'password' => bcrypt('#@Dan123'),
            'role' => 'super admin',
            'email_verified_at' => time()
        ]);

        // List of departments
        $departments = [
            'Admin', 'HR', 'IT', 'Accounting', 'Purchasing', 'COOP', 'GA', 'GA/Nurse', 
            'Safety', 'Finance', 'Guard House', 'Sales', 'Facilities', 'IMS', 'CMM', 
            'QC', 'Assembly', 'Die Casting', 'Die Mold', 'Die Casting Engineering', 
            'PPC', 'Machining', 'Machine Engineering', 'Deburring', 'New Project', 
            'MRO Warehouse', 'N/A', 'Learning and Development'
        ];

        // Insert each department into the departments table
        foreach ($departments as $dept) {
            Departments::factory()->create([
                'dept_list' => $dept,
                'created_by' => 1, // Assuming user ID 1 exists
                'updated_by' => 1, // Assuming user ID 1 exists
                'created_at' => time(),
                'updated_at' => time()
            ]);
        }

        // *FOR ACCOUNTUSERS: ------------------>
        $names = [
            'COOP','Kazuhiro Ishikawa','Ronaldo Pasion','Koki Umino','Russel Suaybaguio','Lally-Lyn Dy','Jarold Ebio',
            'Jonathan Reyes','Quendee Joy Espinas','Amity Hope De Paz','Lynie Algora','Roberto Dioquino','Angella Irene Corpuz',
            'Randy Coladilla','Mae Ann Dimailig','Philip Digno','CCTV Operator','LMC MRO','Julie Mark Antoniano','No User',
            'Vanessa Banaag','Joy Mary Anne Peña','Shaira Cabantog','Maria Virgiline Manalo','Jenald Perea','Jessie Lyn Cañada',
            'Marife Rosales','New Project','QC Patrol Staff','Gerald Caña','Sherwin Salarioza','Die Casting Monitor','Jhonard Marfori',
            'Nieva Ilustre','Rommel Laco','Archemedes Diacos','Leila Darjuan','Salvacion Ganancial','Aaron Pamatmat','Joshua Quiñones',
            'Mary Ann Cortez','Marivic Altarez','Jayvee Malimban','Joel Velasco','Jose Macalintal','Jimmy Rosete','Rommel Manto',
            'Annaliza Buban','Anthonette Austria','Rhodora Raguin','Jenny Domingo','LMC CMM','Rowel Tagle','Marvin Condino',
            'Jovencio Mendigoria','Celso Cosico','Teodoro Marasigan','Jesusito Botin','Isaac Sarabia','Jonathan Camalla',
            'Maria Delos Reyes Botin (Desktop)','Reymond Balboa','Daisy Espiritu','Die Casting','Melissa Evasco','Security Guard',
            'Gaudencio Castillo','Allan Relente','Maricel Salarioza','Die Casting QC Patrol','Emiliano Labsan','Assembly Monitor 1',
            'Assembly Monitor 2','QC UWAVE','Fe Laarni Urmeneta','LMC QC Uwave 2','Hazel Caraan','Lilibeth Coladilla','Machining Monitor',
            'LMC QC Uwave 3','IMS Scanner','LMC QC Uwave 4','QC Uwave 7','QC Uwave 8','QC Uwave 9','Assembly PC 02','Die Casting PC',
            'Deburring PC','Machining PC','PPC Sticker Label','Marcelito Brabante','Emanuel Abne','Rusty Pungot','John Carlo Abaño',
            'Bartolome Sidamon','Edinor Obciana','QC Uwave 3','Andrea Gonzales','LMC Assembly','Estefhanny Lim','Cesar Quiros',
            'Assembly Encoding','Michael Villanueva','Assembly PC 01','Dannah Donato','Rachelle Untalan','Ralph Anthony Ponce',
            'Russel Reyes','Pepito Pascual','Maria Delos Reyes Botin (Tablet)','HR Laptop','John Derick Aspuria','Mae Mancinido',
            'Francis Fort Calimutan','Ronnel Greganda','Maria Botin (Laptop)','QC Multiple user','Rica Jane Orate','Maria Cristina Ebba',
            'Knova Dianne De Vera','Kenji Yokozuka','Maila Ayessa Ranes','Christopher Panghulan','John Patrick Cruz','Joselito De Guzman',
            'Jhobert Cariño','Jonas ','Rolly Iponla','Eduardo Altarez','Aries Marcaida','John Ernest Evangelista','Myrna Almarinez',
            'Training Laptop HR','Training Laptop 1','Training Laptop 2','Training Desktop','Jenell Calicoy','Jerry Pujeda',
            'Melvin Rullan','Training Laptop 3','Bernadette Bernardo','Dan Mark Caravana','Junisio Lumbres','Ruth Odiamar','Arvin Jade Villanueva',
            'Rey Hondrade','Ericka Verdeflor','Eulalia Paral','ITD'
        ];

        $initials = [
            'COOP','K.Ishikawa','R.Pasion','K.Umino','R.Suaybaguio','LL.Dy','J.Ebio','J.Reyes','QJ.Espinas','AH.Depaz',
            'L.Algora','R.Dioquino','AI.Corpuz','R.Coladilla','MA.Dimailig','P.Digno','C.Operator','lmc.mro','JM.Antoniano',
            'No User','S.Staff','JMA.Peña','S.Cabantog','MV.Manalo','J.Perea','JL.Cañada','M.Rosales','New Project','qcpatrolstaff',
            'G.Caña','S.Salarioza','dc.monitor','J.Marfori','N.Ilustre','R.Laco','A.Diacos','L.Darjuan','S.Ganancial',
            'A.Pamatmat','J.Quiñones','MA.Cortez','M.Altarez','J.Malimban','J.Velasco','J.Macalintal','J.Rosete','R.Manto',
            'A.Buban','A.Austria','R.Raguin','J.Domingo','lmc.cmm','R.Tagle','M.Condino','J.Mendigoria','C.Cosico','T.Marasigan',
            'N.Botin','I.Sarabia','J.Camalla','Ma.Delosreyes','R.Balboa','D.Espiritu','dce','M.Evasco','s.guard','G.Castillo',
            'A.Relente','M.Salarioza','dcqc.patrol','E.Labsan','Assemby Monitor 1','Assemby Monitor 2','QC UWAVE','FL.Urmeneta',
            'lmc.qcuwave2','H.Caraan','L.Coladilla','machining.monitor','lmc.qcuwave3','ims.scanner','lmc.qcuwave4','qcuwave7',
            'qcuwave8','qcuwave9','assypc02','DCPC','DBPC','MCPC','PPC Sticker Label','M.Brabante','E.Abne','R.Pungot','JC.Abano',
            'B.Sidamon','E.Obciana','qc.uwave3','AM.Gonzales','LMCASSY','E.Lim','C.Quiros','A.Encoding','M.Villanueva','assypc01',
            'D.Donato','R.Untalan','RA.Ponce','R.Reyes','P.Pascual','Tablet','HR Laptop','JD.Aspuria','MM.Mancinido','ff.calimutan',
            'R.Greganda','m.botin','qc.mu','rj.orate','mc.ebba','kd.devera','k.yokozuka','ranes','c.panghulan','jp.cruz','d.deguzman',
            'J.Carino','Tubaying','R.Iponla','E.Altarez','A.Marcaida','je.evangelista','m.almarinez','training.hr','training Laptop 1',
            'training Laptop 2','Desktop','J.Calicoy','j.pujeda','m.rullan','hrtraining.laptop3','b.bernardo','dm.caravana','j.lumbres',
            'r.odiamar','aj.villanueva','r.hondrade','e.verdeflor','e.paral','it.department'

        ];

        $status = [
            "Employed","Employed","Employed","Employed","Employed","Resigned","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Resigned","Employed","Employed","Employed","Resigned","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Resigned","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Resigned","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed","Employed","Employed","Resigned","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Resigned","Employed","Employed","Employed","Employed","Employed","Employed","Employed",
            "Employed","Employed","Employed","Employed","Employed"
        ];
        

        $accountusersDept =[
            'COOP', 'Admin', 'IT', 'Admin', 'HR', 'HR', 'GA', 'Safety', 'Accounting', 
            'GA/Nurse', 'Purchasing', 'Accounting', 'Finance', 'IMS', 'Accounting', 
            'Machine Engineering', 'Guard House', 'MRO Warehouse', 'Purchasing', 'N/A', 
            'PPC', 'PPC', 'PPC', 'Sales', 'New Project', 'MRO Warehouse', 'QC', 'New Project', 
            'Assembly', 'QC', 'QC', 'Die Casting', 'QC', 'New Project', 'Machining', 'QC', 
            'CMM', 'Die Casting', 'Deburring', 'Die Mold', 'Deburring', 'Die Casting', 
            'Die Casting', 'Die Casting Engineering', 'Die Mold', 'Deburring', 'Machining', 
            'Machining', 'Machining', 'Machining', 'HR', 'CMM', 'GA', 'Die Casting', 
            'Facilities', 'Machine Engineering', 'IMS', 'GA', 'IT', 'PPC', 'QC', 'PPC', 
            'Finance', 'Die Casting', 'PPC', 'Guard House', 'Die Casting Engineering', 
            'Die Mold', 'Deburring', 'Deburring', 'Die Casting', 'Assembly', 'Assembly', 
            'Assembly', 'QC', 'Assembly', 'PPC', 'Assembly', 'Machining', 'QC', 'IMS', 
            'Assembly', 'QC', 'QC', 'QC', 'Assembly', 'Die Casting', 'Deburring', 'Machining', 
            'PPC', 'New Project', 'New Project', 'Die Mold', 'Die Casting', 'Machine Engineering', 
            'Admin', 'Assembly', 'QC', 'Assembly', 'PPC', 'Safety', 'Assembly', 'Machining', 
            'Assembly', 'Accounting', 'Accounting', 'Sales', 'Purchasing', 'GA', 'QC', 'HR', 
            'Facilities', 'HR', 'Die Casting', 'PPC', 'QC', 'QC', 'HR', 'HR', 'QC', 'Admin', 
            'HR', 'Safety', 'Facilities', 'Die Casting', 'Facilities', 'IT', 'PPC', 'QC', 
            'MRO Warehouse', 'Facilities', 'HR', 'HR', 'HR', 'HR', 'HR', 'IT', 'HR', 'HR', 'HR', 'Accounting',
            'IT','Die Casting', 'Die Mold', 'New Project', 'Die Mold', 'QC', 'QC','IT'
        ];

        
        foreach ($names as $index =>  $name){
            $initial = $initials[$index];
            $accusersDept = $accountusersDept[$index];
            $accountusersStatus = $status[$index];

            AccountUsers::factory()->create([
                'name' => $name,
                //profilePath
                'department_users' => $accusersDept,
                'initial' => $initial,
                'status' => $accountusersStatus,
                'created_by' => 1, // Assuming user ID 1 exists
                'updated_by' => 1, // Assuming user ID 1 exists
                'created_at' => time(),
                'updated_at' => time()
            ]);
        }

        // AccountUsers::factory()
        //     ->count(30)
        //     ->create();
        // *End -------------------------->
    }
}
