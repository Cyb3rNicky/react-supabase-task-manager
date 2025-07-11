# 📝 Task Manager App

Aplicación de gestión de tareas construida con **React**, **Vite**, **Supabase** y **Tailwind CSS**. Permite crear, editar, completar y eliminar tareas protegidas por autenticación.

---

## 🚀 Tecnologías

- ⚛️ React + Vite
- 🐘 Supabase (PostgreSQL + Auth)
- 💨 Tailwind CSS
- 🔐 Supabase RLS (Row Level Security)

---

## 📦 Requisitos

- Node.js (v18+)
- Cuenta en [Supabase](https://supabase.com/)
- Yarn o npm

---

## ⚙️ Instalación

1. **Clona el repositorio:**

bash
git clone https://github.com/Cyb3rNicky/react-supabase-task-manager
cd react-supabase-task-manager

2. **Instala dependencias:**

npm install
# o con Yarn
yarn install

3. **Crea el archivo .env.local:**

VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima

4. **Inicia el proyecto en desarrollo:**

npm run dev
# o con Yarn
yarn dev


# 🗄️ Configuración de Supabase

1. Crea la tabla tareas:

CREATE TABLE tareas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  titulo text NOT NULL,
  descripcion text,
  fecha_vencimiento date,
  terminada boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

2. Habilita RLS (Row Level Security):

ALTER TABLE tareas ENABLE ROW LEVEL SECURITY;

3. Agrega las siguientes políticas:

-- Solo ver tareas propias
CREATE POLICY "Solo ver tareas propias"
ON tareas FOR SELECT
USING (auth.uid() = user_id);

-- Solo insertar si es el usuario autenticado
CREATE POLICY "Insertar tarea propia"
ON tareas FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Solo actualizar si es el usuario autenticado
CREATE POLICY "Actualizar tarea propia"
ON tareas FOR UPDATE
USING (auth.uid() = user_id);

-- Solo eliminar si es el usuario autenticado
CREATE POLICY "Eliminar tarea propia"
ON tareas FOR DELETE
USING (auth.uid() = user_id);


# 🧪 Funcionalidades principales

✅ Registro e inicio de sesión con Supabase Auth

📝 Crear, editar, completar y eliminar tareas

🔍 Buscar tareas por nombre

📆 Marca de tareas vencidas

✅ Estado de completadas con ícono

🔒 Acceso seguro con RLS (tareas por usuario)


# 🧼 Build para producción

npm run build
# o con Yarn
yarn build