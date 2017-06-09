Rails.application.routes.draw do
  root 'chemistry#index'
  get 'chemistry' => 'chemistry#index'
  get 'element_pair' => 'chemistry#element_pair'
  get 'molecule_bonds' => 'chemistry#molecule_bonds'
  get 'molecule_fields' => 'chemistry#molecule_fields'
  post 'calculate_enthalpy' => 'chemistry#calculate_enthalpy'
end
