export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      badges: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          criteria: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          criteria?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          criteria?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exam_categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          slug?: string
          created_at?: string
          updated_at?: string
        }
      }
      options: {
        Row: {
          id: string
          question_id: string
          option_text: string
          is_correct: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question_id: string
          option_text: string
          is_correct?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          option_text?: string
          is_correct?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      question_topics: {
        Row: {
          id: string
          question_id: string
          topic_id: string
          created_at: string
        }
        Insert: {
          id?: string
          question_id: string
          topic_id: string
          created_at?: string
        }
        Update: {
          id?: string
          question_id?: string
          topic_id?: string
          created_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          test_id: string
          question_text: string
          question_type: string
          difficulty_level: string
          points: number | null
          explanation: string | null
          created_at: string
          updated_at: string
          image_url: string | null
        }
        Insert: {
          id?: string
          test_id: string
          question_text: string
          question_type: string
          difficulty_level: string
          points?: number | null
          explanation?: string | null
          created_at?: string
          updated_at?: string
          image_url?: string | null
        }
        Update: {
          id?: string
          test_id?: string
          question_text?: string
          question_type?: string
          difficulty_level?: string
          points?: number | null
          explanation?: string | null
          created_at?: string
          updated_at?: string
          image_url?: string | null
        }
      }
      tests: {
        Row: {
          id: string
          exam_category_id: string
          title: string
          description: string | null
          duration_minutes: number
          difficulty_level: string
          passing_percentage: number | null
          is_featured: boolean | null
          is_published: boolean | null
          created_at: string
          updated_at: string
          image_url: string | null
        }
        Insert: {
          id?: string
          exam_category_id: string
          title: string
          description?: string | null
          duration_minutes: number
          difficulty_level: string
          passing_percentage?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
          image_url?: string | null
        }
        Update: {
          id?: string
          exam_category_id?: string
          title?: string
          description?: string | null
          duration_minutes?: number
          difficulty_level?: string
          passing_percentage?: number | null
          is_featured?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
          image_url?: string | null
        }
      }
      topics: {
        Row: {
          id: string
          exam_category_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          exam_category_id: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          exam_category_id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_id: string
          earned_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_id: string
          earned_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_id?: string
          earned_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          study_goal: string | null
          target_exam: string | null
          target_score: number | null
          target_date: string | null
          daily_study_goal_minutes: number | null
          streak_days: number | null
          last_study_date: string | null
          created_at: string
          updated_at: string
          role: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          study_goal?: string | null
          target_exam?: string | null
          target_score?: number | null
          target_date?: string | null
          daily_study_goal_minutes?: number | null
          streak_days?: number | null
          last_study_date?: string | null
          created_at?: string
          updated_at?: string
          role?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          study_goal?: string | null
          target_exam?: string | null
          target_score?: number | null
          target_date?: string | null
          daily_study_goal_minutes?: number | null
          streak_days?: number | null
          last_study_date?: string | null
          created_at?: string
          updated_at?: string
          role?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          exam_category_id: string
          tests_completed: number | null
          average_score: number | null
          total_time_spent_seconds: number | null
          strengths: string[] | null
          weaknesses: string[] | null
          last_activity_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          exam_category_id: string
          tests_completed?: number | null
          average_score?: number | null
          total_time_spent_seconds?: number | null
          strengths?: string[] | null
          weaknesses?: string[] | null
          last_activity_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          exam_category_id?: string
          tests_completed?: number | null
          average_score?: number | null
          total_time_spent_seconds?: number | null
          strengths?: string[] | null
          weaknesses?: string[] | null
          last_activity_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_responses: {
        Row: {
          id: string
          user_test_id: string
          question_id: string
          selected_option_id: string | null
          text_response: string | null
          is_correct: boolean | null
          is_flagged: boolean | null
          time_spent_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_test_id: string
          question_id: string
          selected_option_id?: string | null
          text_response?: string | null
          is_correct?: boolean | null
          is_flagged?: boolean | null
          time_spent_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_test_id?: string
          question_id?: string
          selected_option_id?: string | null
          text_response?: string | null
          is_correct?: boolean | null
          is_flagged?: boolean | null
          time_spent_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      user_tests: {
        Row: {
          id: string
          user_id: string
          test_id: string
          status: string
          score: number | null
          percentage: number | null
          start_time: string
          end_time: string | null
          time_spent_seconds: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          test_id: string
          status: string
          score?: number | null
          percentage?: number | null
          start_time?: string
          end_time?: string | null
          time_spent_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          test_id?: string
          status?: string
          score?: number | null
          percentage?: number | null
          start_time?: string
          end_time?: string | null
          time_spent_seconds?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
